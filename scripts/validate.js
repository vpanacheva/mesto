const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button ",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};

function disabledSubmit(evt) {
  evt.preventDefault();
}

const showInputError = (validationConfig, formElement, inputElement, message) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = message; 
  errorElement.classList.add(validationConfig.errorClass); 
};

const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass); 
  errorElement.textContent = "";
};

const disabledSubmitBotton = (validationConfig, buttonElement) => {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activeSubmitBotton = (validationConfig, buttonElement) => {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.disabled = false;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  });
};

const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { 
    disabledSubmitBotton(validationConfig, buttonElement);
  } else {
    activeSubmitBotton(validationConfig, buttonElement);
  }
};

const disablesSubmitForm = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  toggleButtonState(validationConfig, inputList, buttonElement); 
  inputList.forEach(inputElement => { 
    hideInputError(validationConfig, formElement, inputElement);
  });
};

const isValid = (validationConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) { 
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};

const setEventListeners = (validationConfig, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(validationConfig, inputList, buttonElement); 

  inputList.forEach((inputElement) => { 
    inputElement.addEventListener("input", function () {
      isValid(validationConfig, formElement, inputElement); 
      toggleButtonState(validationConfig, inputList, buttonElement); 
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
  formList.forEach((formElement) => { 
    formElement.addEventListener("submit", disabledSubmit);
    setEventListeners(validationConfig, formElement); 
  });
};

enableValidation(validationOptions);

export { validationOptions, disablesSubmitForm }; 