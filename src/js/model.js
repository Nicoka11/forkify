import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: 10
  },
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
  } catch (err) {
    console.error(`${err}💛`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(
      `${API_URL}?search=${query}&key=0f8ada3d-fe8e-49c7-a4c7-6ab6695b1541`
    );

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
  state.search.page = page

  const start = (page-1) * state.search.resultsPerPage
  const end = page * state.search.resultsPerPage

  return state.search.results.slice(start,end)
}
