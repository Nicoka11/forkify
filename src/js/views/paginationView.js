import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // More than 10 results and page 1
    if (this._data.results.length > 10 && this._data.page === 1) {
      return `
             <button data-goto=${
               this._data.page + 1
             } class="btn--inline pagination__btn--next">
             <span>Page ${this._data.page + 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
             </svg>
           </button> 
             `;
    }

    if (this._data.page === numPages && numPages > 1) {
      return `
             <button data-goto=${
               this._data.page - 1
             } class="btn--inline pagination__btn--prev">
             <span>Page ${this._data.page - 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
           </button> 
             `;
    }

    if (this._data.page < numPages && numPages > 1) {
      return `
             <button data-goto=${
               this._data.page - 1
             } class="btn--inline pagination__btn--prev">
             <span>Page ${this._data.page - 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
           </button> 
             <button data-goto=${
               this._data.page + 1
             } class="btn--inline pagination__btn--next">
             <span>Page ${this._data.page + 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
             </svg>
           </button> 
             `;
    }

    return '';
  }
}

export default new PaginationView();
