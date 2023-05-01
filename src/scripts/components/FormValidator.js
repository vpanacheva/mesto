export class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`); 
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage; 
    errorElement.classList.add(this._errorClass); 
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    ); // находим элемент ошибки
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass); //
    errorElement.textContent = ''; 
  }

  _isValid(inputElement) {
    if (!this._inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._inactiveButtonClass, 
      !isFormValid 
    );
  }

  _setEventListeners() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}