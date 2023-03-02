import View from "./View.js";
import icons from 'url:../../img/icons.svg';


class ResultsView extends View {
  _parentEl = document.querySelector('.results')
  _errorMessage = 'No recipes found for your query! Please try again ;)'
  _message = ''

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
   
  }
  _generateMarkupPreview(elem) {
    return `<li class="preview">
              <a class="preview__link" href="#${elem.id}">
                <figure class="preview__fig">
                  <img src="${elem.image}" alt="${elem.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${elem.title}</h4>
                  <p class="preview__publisher">${elem.publisher}</p>
                </div>
              </a>
            </li>`
    
  }
}

export default new ResultsView()