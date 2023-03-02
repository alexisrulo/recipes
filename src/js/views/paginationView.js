import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _generateButtonPrev(curPage) {
    return `
          <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;
  }

  _generateButtonNext(curPage) {
    return `
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages.
    if (curPage === 1 && numPages > 1) {
      return this._generateButtonNext(curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateButtonPrev(curPage);
    }

    // Other page
    if (curPage < numPages) {
      const buttonsMarkup =
        this._generateButtonPrev(curPage) + this._generateButtonNext(curPage);
      return buttonsMarkup;
    }

    // Page 1, and there are NO other pages.
    return '';
  }
}

export default new PaginationView();
