import { API_URL } from './config.js';
import { KEY } from './config.js';
import { getJSON } from './helpers.js';
import { sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    if (id.length < 10) return;
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    state.bookmarks?.some(b => b.id === id)
      ? (state.recipe.bookmarked = true)
      : (state.recipe.bookmarked = false);
  } catch (err) {
    console.error(`${err}💛`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.page = 1;
    state.search.query = query;
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    if (!state.search.results.length) throw new Error('No recipe found');
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (servingsNum) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * servingsNum) / state.recipe.servings)
  );
  state.recipe.servings = servingsNum;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

export const uploadRecipe = async function (recipeData) {
  try {
    const ingredients = Object.entries(recipeData)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll('', '').split(',');

        if (ingArr.length != 3) throw new Error('Wrong ingredient format :(');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    console.log(ingredients);

    const recipe = {
      title: recipeData.title,
      source_url: recipeData.sourceUrl,
      publisher: recipeData.publisher,
      image_url: recipeData.image,
      cooking_time: +recipeData.cookingTime,
      servings: +recipeData.servings,
      ingredients,
    };
  
    console.log(recipe)

    const data = await sendJSON(`${API_URL}?key=${KEY}`,recipe)
    console.log(data)
  } catch (err) {
    throw err;
  }

  
};

const init = function () {
  const localBookmarks = localStorage.getItem('bookmarks');
  if (localBookmarks) {
    state.bookmarks = JSON.parse(localBookmarks);
  }
};

init();
