import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // 0) Update result view to mark selected search result

    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe

    await model.loadRecipe(id);

    const { recipe } = model.state;

    // 2) Rendering recipe

    recipeView.render(recipe);
    // debugger;
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err + ' 💥');
    recipeView.renderError();
  }
};

const controlSearchRecipes = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load search result
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlPagination = function (page) {
  model.state.search.page = page;
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  // Update the recipe serving and ingredients quantities
  model.updateServing(newServings);
  // Render new ingredients quantities and serving
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe?.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmar(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
};

init();
