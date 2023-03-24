class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _showInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`); 
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage; 
    errorElement.classList.add(this._errorClass); 
  }

  _hideInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`); 
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.add(this._errorClass); 
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

    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  disablesSubmitForm() {
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

export { FormValidator };