let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");
let saveButton = popup.querySelector(".popup__save-button");
let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput= formElement.querySelector(".popup__input_type_about");
let profileTitle= document.querySelector(".profile__title");
let profileSubtitle= document.querySelector(".profile__subtitle");

function toggleOpenPopup(){
    popup.classList.toggle("popup_opened");
}
function handlEditButtonClick (){
    toggleOpenPopup();
    nameInput.value= profileTitle.textContent;
    jobInput.value=profileSubtitle.textContent;
}

function handlCloseButtonClick (){
    toggleOpenPopup();
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    toggleOpenPopup();
}

formElement.addEventListener("submit", handleFormSubmit); 
editButton.addEventListener("click",handlEditButtonClick);
closeButton.addEventListener("click",handlCloseButtonClick);
saveButton.addEventListener('click', handleFormSubmit);
