const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button ",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error",
};

function disabledSubmit(evt) {
  evt.preventDefault();
}

const showInputError = (object, formElement, inputElement, message) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = message; 
  errorElement.classList.add(object.errorClass); 
};


const hideInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.add(object.errorClass); 
  errorElement.textContent = ""; 
};

const disabledSubmitBotton = (object, buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activeSubmitBotton = (object, buttonElement) => {
  buttonElement.classList.remove(object.inactiveButtonClass);
  buttonElement.disabled = false;
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  });
};

const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { 
    disabledSubmitBotton(object, buttonElement);
  } else {
    activeSubmitBotton(object, buttonElement);
  }
};

const disablesSubmitForm = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector)); 
  const buttonElement = formElement.querySelector(object.submitButtonSelector); 
  toggleButtonState(object, inputList, buttonElement); 
  inputList.forEach(inputElement => { 
    hideInputError(object, formElement, inputElement);
  });
};

const isValid = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) { 
    showInputError(object, formElement, inputElement, inputElement.validationMessage); 
  } else {
    hideInputError(object, formElement, inputElement); 
  }
};

const setEventListeners = (object, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector) 
  );
  const buttonElement = formElement.querySelector(object.submitButtonSelector); 
  toggleButtonState(object, inputList, buttonElement); 

  inputList.forEach((inputElement) => { 
    inputElement.addEventListener("input", function () {
      isValid(object, formElement, inputElement); 
      toggleButtonState(object, inputList, buttonElement); 
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector)); 
  formList.forEach((formElement) => { 
    formElement.addEventListener("submit", disabledSubmit);
    setEventListeners(object, formElement);
  });
};

enableValidation(validationOptions);

export { validationOptions, disablesSubmitForm }; 