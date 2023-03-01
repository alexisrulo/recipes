import * as model from './model.js';
import recipeView from './views/recipeView.js'

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
  }
};
['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
