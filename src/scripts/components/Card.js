export class Card  {
constructor( { data, userId, viewPopupImage, handleCardDelete, handleCardLike, handleRemoveLike, }, templateSelector) {
this._name = data.name;
this._link = data.link;
this._id = data._id;
this._userId = userId;
this._owner = data.owner._id;
this._likes = data.likes;
this._viewPopupImage = viewPopupImage;
this._handleCardDelete = handleCardDelete;
this._handleCardLike = handleCardLike;
this._handleRemoveLike = handleRemoveLike;
this._templateSelector = templateSelector;
}
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector) 
          .content.querySelector(".card__info") 
         .cloneNode(true); 
        return cardElement; 
      }
     
  getId() {
    return this._id;
  }
  cardLiked(data) {
    this._likes = data.likes;
    this._elementLike.classList.toggle("card__like_active-button");
    this._likesCounter.textContent = this._likes.length;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _changeLikeState() {
    if (this._elementLike.classList.contains("card__like_active-button")) {
      this._handleRemoveLike(this._id);
    } else {
      this._handleCardLike(this._id);
    }
  }

  _checkUserDeleteState() {
    if (this._owner !== this._userId) {
      this._elementRemove.remove();
    }
  }

  _isCardLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._elementLike.classList.add("card__like_active-button");
    }
  }

  _setEventListeners() {
    this._elementImg.addEventListener('click', () => {
      this._viewPopupImage();
    });

    this._elementLike.addEventListener('click', () => {
      this._changeLikeState();
    });

    this._elementRemove.addEventListener('click', () => {
      this._handleCardDelete();
    });
  }
  
      generateCard() {
        this._element = this._getTemplate(); 
        this._elementImg = this._element.querySelector(".card__img");
        this._elementTitle = this._element.querySelector(".card__title");
        this._elementLike = this._element.querySelector(".card__like-button");
        this._elementRemove = this._element.querySelector(".card__remove-button");
        this._likesCounter = this._element.querySelector(".card__likes-counter");
    
        this._setEventListeners();
        this._checkUserDeleteState();
        this._isCardLiked();
    
        this._elementImg.src = this._link;
        this._elementImg.alt = this._link;
        this._elementTitle.textContent = this._name;
        this._likesCounter.textContent = this._likes.length;
        return this._element; 
      }
    }

    
    