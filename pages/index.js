let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");

function handlEditButtonClick (){
    popup.classList.add('popup_opened');
}

function handlCloseButtonClick (){
    popup.classList.remove('popup_opened');
}

editButton.addEventListener("click",handlEditButtonClick);
closeButton.addEventListener("click",handlCloseButtonClick);

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput= formElement.querySelector(".popup__input_type_about");
let profileTitle= document.querySelector(".profile__title");
let profileSubtitle= document.querySelector(".profile__subtitle");

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    nameInput.value;
    jobInput.value;
    profileTitle.textContent = nameInput.value; 
    profileSubtitle.textContent = jobInput.value;

}

formElement.addEventListener('submit', handleFormSubmit); 