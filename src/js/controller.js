import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // 1 Loading recipe
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    const { recipe } = model.state;

    // 2 Rendering recipe

    recipeView.render(recipe)
    
  } catch (err) {
    console.error(err + ' 💥');
    recipeView.renderError();
  }
};

const controlSearchRecipes = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    resultsView.renderSpinner();
    
    // 2) Load search result
    await model.loadSearchResults(query);
  
    // 3) Render results
    resultsView.render(model.state.search.results);

  }catch (err){
    recipeView.renderError()
  }
}


const init = function() {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchRecipes)
}

init();

