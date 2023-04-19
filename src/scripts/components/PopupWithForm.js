import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form'),
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    }
  
    _getInputValues() { 
      this._formInputValues = {};
      this._inputList.forEach((input) => {
        this._formInputValues[input.name] = input.value;
      });
      return this._formInputValues;
    }

    close() {
      super.close();
      this._form.reset();
    }
    setEventListeners() {
      super.setEventListeners(); 
  
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
    }
  }

