import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clearParent();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clearParent() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const spinner = `<div class="spinner">
                      <svg>
                         <use href="${icons}#icon-loader"></use>
                      </svg>
                  </div>`;
    this._clearParent();
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
  }
  renderError(message = this._errorMessage) {
    const error = `<div class="error">
                    <div>
                      <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                      </svg>
                    </div>
                    <p>${message}</p>
                  </div>`;
    this._clearParent();
    this._parentEl.insertAdjacentHTML('afterbegin', error);
  }

  renderMessage(message = this._message) {
    const error = `<div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                        </svg>
                    </div>
                    <p>${message}</p>
                  </div>`;
    this._clearParent();
    this._parentEl.insertAdjacentHTML('afterbegin', error);
  }
}
