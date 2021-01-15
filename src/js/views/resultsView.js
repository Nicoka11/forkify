import icons from '../../img/icons.svg';
import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipe available for your search, please try something else`;
  _successMessage = `Recipe found succesfully !`;

  _generateMarkup() {
    return `${this._data.results
      .map(
        res => `<li class="preview">
    <a class="preview__link preview__link--active" href="#23456">
      <figure class="preview__fig">
        <img src="${res.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`
      )
      .join('')}
        `;
  }
}

export default new ResultsView();
