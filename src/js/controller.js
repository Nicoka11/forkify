import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';


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
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError()
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery()
    if (!query) return;

    //rendering Spinner
    ResultsView.renderSpinner();
    console.log(query)

    await model.loadSearchResults(query)

    //rendering results
    ResultsView.render(model.state.search)

  } catch (err) {
    ResultsView.renderError()
  }
}

controlSearchResults()

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  SearchView.addHandlerSearch(controlSearchResults)
}
init()