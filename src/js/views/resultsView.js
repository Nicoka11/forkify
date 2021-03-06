// import icons from '../../img/icons.svg';
import View from './view.js';
import PreviewView from './Previewview.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipe available for your search, please try something else`;
  _successMessage = `Recipe found succesfully !`;


  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
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
