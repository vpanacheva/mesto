const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

let popup = document.querySelector(".popup_type_info");
let popupCard = document.querySelector(".popup_type_card");
let popupImg = document.querySelector(".popup_type_image");

let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");
let addButton = document.querySelector(".profile__add-button");


let formElement = document.querySelector(".popup__form");
let formCard = document.querySelector(".popup__form-card");

let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput= formElement.querySelector(".popup__input_type_about");
let profileTitle= document.querySelector(".profile__title");
let profileSubtitle= document.querySelector(".profile__subtitle");

let titleCard=document.querySelector(".popup__input_type_title");
let linkCard=document.querySelector(".popup__input_type_link");

let imgClicked = document.querySelector(".popup__image");
let nameImgClicked = document.querySelector(".popup__figcaption");

let cardsSection =  document.querySelector(".cards");
let cardTemplate = document.querySelector("#card__template"); 



function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
let popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

function handlEditButtonClick (){
  popup.classList.add('popup_opened');
  openPopup(popup);
    nameInput.value= profileTitle.textContent;
    jobInput.value=profileSubtitle.textContent;
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    closePopup(popup)
}

function createCard(item) {
  const cardName= item.name;
  const cardLink = item.link;
  const cardAlt = item.name;
  const cardTemplate = document.querySelector('#card__template').content;
  const cardElement = cardTemplate.querySelector(".card__info").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardName;

  let likeButton = cardElement.querySelector(".card__like-button");
  let removeButton = cardElement.querySelector(".card__remove-button");
  let cardImage = cardElement.querySelector(".card__img");

  cardImage.src = cardLink;
  cardImage.alt = cardAlt;

  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like_active-button");
  });

removeButton.addEventListener("click", (event) => {
  event.target.closest('.card__info').remove();
  });

  cardImage.addEventListener("click", function () {
    imgClicked.src = cardLink;
    imgClicked.alt = cardName;
    nameImgClicked.textContent = cardAlt;
  
    openPopup(popupImg);
  });
  return cardElement;
}
const renderCard =(item)=>{
const cardElement=createCard(item);
cardsSection.prepend(cardElement);
};
initialCards.forEach (card__info =>{
  renderCard(card__info);
});


formCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard({
    name: titleCard.value,
    link: linkCard.value,
  });

  evt.target.reset();
  closePopup(popupCard);
});

addButton.addEventListener("click", function () {
  openPopup(popupCard);
});

formElement.addEventListener("submit", handleFormSubmit); 
editButton.addEventListener("click",handlEditButtonClick); 

saveButton.addEventListener('click', handleFormSubmit); 

