// import icons from '../../img/icons.svg';
import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipe available for your search, please try something else`;
  _successMessage = `Recipe found succesfully !`;


  _generateMarkup() {
    const curId = window.location.hash.slice(1)

    return `${this._data
      .map(
        res => `<li class="preview">
    <a class="preview__link ${curId === res.id ? 'preview__link--active' : ''}" href="#${res.id}">
      <figure class="preview__fig">
        <img src="${res.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
      </div>
    </a>
  </li>`
      )
      .join('')}
        `;
  }

  addHandlerResult(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const activeRecipe = e.target.closest('.preview');
      this.activeRecipeId = activeRecipe.id;
      console.log(activeRecipe, this.activeRecipeId);
      handler();
    });
  }
}

export default new ResultsView();
