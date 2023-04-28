import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form'),
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._submitButtonText = this._submitButton.textContent;
    }
  
    _getInputValues() {
      this._formInputValues = {}; //создали пустой объект
  
      this._inputList.forEach((input) => {
        //наполнили объект значениями всех полей через forEach
        this._formInputValues[input.name] = input.value;
      });
      return this._formInputValues; //вернули заполненный объект
    }
  
    close() {
      super.close();
      this._form.reset();
    }
  
    /** связываем с  _getInputValues*/
    setEventListeners() {
      super.setEventListeners(); //перезаписывает родительский метода
  
      this._form.addEventListener('submit', (e) => {
        //добавляет обработчик сабмита форме
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues()); //передали в функцию объект (результат работы _getInputValues)
        //this.close();
      });
    }
  
    /** показываем ход загрузки/сохранения */
    renderLoading(isLoading, submitButtonText) {
      if (isLoading) {
        this._submitButton.textContent = submitButtonText;
        this._submitButton.disabled = true;
      } else {
        this._submitButton.textContent = submitButtonText;
        this._submitButton.disabled = false;
      }
    }
  
  }
  