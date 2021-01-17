import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe);
  } catch (err) {
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
    ResultsView.renderError();
  }
};

const controlActiveRecipe = function () {
  const recipeId = ResultsView.activeRecipeId;
  console.log(ResultsView.activeRecipeId);
  ResultsView.activeResult(recipeId);
};

const controlPagination = function (goToPage) {
  console.log('Page Control is working', goToPage);

  //rendering new results
  ResultsView.render(model.getSearchResultsPage(goToPage));

  // Render New Pagination
  PaginationView.render(model.state.search);
};

const controlServings = function () {
  // Update Recipe Servings
  model.updateServings(8) 

  // Update he recipe view 
  recipeView.render(model.state.recipe);


}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  // ResultsView.addHandlerResult(controlActiveRecipe);
  PaginationView.addHandlerClick(controlPagination);
};
init();
