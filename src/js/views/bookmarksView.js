// import icons from '../../img/icons.svg';
import View from './view.js';
import PreviewView from './Previewview.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet, find a nice recipe and bookmark it !`;
  _successMessage = `Recipe found succesfully !`;


  addHandlerRender(handler) {
      window.addEventListener('load', handler)
  }  
    
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

export default new BookmarksView();
