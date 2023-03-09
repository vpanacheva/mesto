const obj = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button ",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input-error",
    errorClass: "popup__input-error",
  };
 
// Отключаем отправку форм.

  
  // Функция, которая добавляет класс с ошибкой.
  const showInputError = (object, formElement, inputElement, errorMessage) => {
    // находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
    errorElement.classList.add(object.errorClass); // Замена содержимого span с ошибкой на переданный параметр
  };
  
  // Функция, которая удаляет класс с ошибкой.
  const hideInputError = (object, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим элемент ошибки
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.add(object.errorClass); //
    errorElement.textContent = ""; //Скрываем сообщение об ошибке
  };
  
  // Функции, которые создают неактивную и активную кнопки отправки.
  const disabledSubmitBtm = (object, buttonElement) => {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = true;
  };
  
  const activeSubmitBtm = (object, buttonElement) => {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = false;
  };
  
  // Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { //Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны
      return !inputElement.validity.valid; //Eсли поле не валидно, вернет true. Обход массива остановится и вся фкнуция вернет true
    });
  };
  
  // Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
  const toggleButtonState = (object, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) { //Если хотя бы один невалидный инпут, кнопка неактивна
      disabledSubmitBtm(object, buttonElement);
    } else {
      activeSubmitBtm(object, buttonElement);
    }
  };
  
  
  //Функция проверки формы -> деактивании кнопки и удаления текста ошибки
  const disablesSubmitForm = (object, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector)); // Ищем все инпуты
    const buttonElement = formElement.querySelector(object.submitButtonSelector); // Ищем кнопку
    toggleButtonState(object, inputList, buttonElement); //Включаем проверку для определения статуса кнопки
    inputList.forEach(inputElement => { //Каждому инпуту включаем обработчик скрытия ошибки (ps инпуты при повторном открытии попап добавления картинки очищаются после сабмита)
      hideInputError(object, formElement, inputElement);
    });
  };
  
  
  // Функция, которая проверяет валидность поля. Принимает formElement и inputElement, не берет их из внешней области видимости.
  // Функция isValid принимает сразу два параметра: formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме. И inputElement — проверяемое поле ввода.*
  const isValid = (object, formElement, inputElement) => {
    if (!inputElement.validity.valid) { // Если поле не проходит валидацию, покажем ошибку передаем сообщение об ошибке вторым аргументом
      showInputError(object, formElement, inputElement, inputElement.validationMessage); //ShowInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле.
    } else {
      hideInputError(object, formElement, inputElement); // Если поле прошло валидацию, скроем ошибку // hideInputError теперь получает параметром форму, в которой находится проверяемое полу, и само это поле.
    }
  };
  
  // Функция, которая добавляет обработчик для всех полей формы
  const setEventListeners = (object, formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(object.inputSelector) //Находим все поля внутри формы, делаем из них массив через Array.from
    );
    const buttonElement = formElement.querySelector(object.submitButtonSelector); // Находим в текущей форме кнопку отправки
    toggleButtonState(object, inputList, buttonElement); //Вызываем toggleButtonState, чтобы не ждать ввода данных в поля
  
    inputList.forEach((inputElement) => { //Обходим все элементы массива, полученного выше
      inputElement.addEventListener("input", function () {//Каждому полю добавляем обработчик события input
        isValid(object, formElement, inputElement); //Внутри колбэка вызываем isVslid, передав форму и инпут
        toggleButtonState(object, inputList, buttonElement); //Вызываем toggleButtonState и передача ей массива полей и кнопки
      });
    });
  };
   
  // Функция, которая найдет, переберет все формы на странице и добавит всем формам обработчик
  const enableValidation = (object) => {
    const formList = Array.from(document.querySelectorAll(object.formSelector)); //Находим все формы с указанным классом в DOM, делаем из них массив через Array.from
    formList.forEach((formElement) => { //Перебираем полученный массив
      formElement.addEventListener("submit", disabledSubmit);
      setEventListeners(object, formElement); // Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы
    });
  };
  
  enableValidation(obj);
  