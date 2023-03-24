class Card {
    constructor(data, templateSelector, viewPopupImage) {
      this._name = data.name;
      this._link = data.link;
      this._viewPopupImage = viewPopupImage;
      this._templateSelector = templateSelector;
    }
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector) 
          .content.querySelector(".card__info") 
         .cloneNode(true); 
        return cardElement; 
      }
      generateCard() {
        this._element = this._getTemplate(); 
        this._elementImg = this._element.querySelector(".card__img");
        this._elementTitle = this._element.querySelector(".card__title");
        this._elementLike = this._element.querySelector(".card__like-button");
        this._elementRemove = this._element.querySelector(".card__remove-button");
    
        this._setEventListeners();
    
        this._elementImg.src = this._link;
        this._elementImg.alt = this._link;
        this._elementTitle.textContent = this._name;
        return this._element; 
    }
    _like() {
        this._elementLike.classList.toggle("card__like_active-button");
      }
    
      _remove() {
        this._element.remove();
        this._element = null;
      }
    
      _setEventListeners() {
        this._elementImg.addEventListener("click", () => {
          this._viewPopupImage(this._name, this._link);
        });
    
        this._elementLike.addEventListener("click", () => this._like());
        this._elementRemove .addEventListener("click", () => this._remove());
      }
    }
    
    export { Card };
    