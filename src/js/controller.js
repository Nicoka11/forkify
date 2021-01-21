import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //Updating Results View
    ResultsView.update(model.getSearchResultsPage());

    // Loading Recipe
    await model.loadRecipe(id);

    // Update Bookmarks
    BookmarksView.update(model.state.bookmarks);

    model.updateServings(model.state.recipe.servings);

    // Rendering Recipe
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;

    //rendering Spinner
    ResultsView.renderSpinner();

    await model.loadSearchResults(query);

    //rendering results
    ResultsView.render(model.getSearchResultsPage());

    // Render Initial Pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    ResultsView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  console.log('Page Control is working', goToPage);

  //rendering new results
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // Render New Pagination
  PaginationView.render(model.state.search);
};

const controlServings = function (servingsNum) {
  // Update Recipe Servings
  model.updateServings(servingsNum);

  // Update he recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  }

  // Remove Bookmark
  else {
    model.removeBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render Bookmark list
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipeData) {
  try {
    console.log(newRecipeData);

    await model.uploadRecipe(newRecipeData);
  } catch (err) {
    console.error('🧡', err);
    AddRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerupdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  BookmarksView.addHandlerRender(controlBookmarks);
  AddRecipeView.addHandlerSubmit(controlAddRecipe);
};
init();
