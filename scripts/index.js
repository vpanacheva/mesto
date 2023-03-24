
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationOptions } from './constants.js';

const popupEditProfile = document.querySelector(".popup_type_info");
const popupEditCard = document.querySelector(".popup_type_card");
const popupEditImg = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const newCardElement = document.querySelector(".popup__form");
const newCardForm = document.querySelector(".popup__form-card");
const newCardInfo = document.querySelector(".popup__form-info");

const profileNameInput = newCardElement.querySelector(".popup__input_type_name");
const profileJobInput = newCardElement.querySelector(".popup__input_type_about");
const profileTitleInput = document.querySelector(".profile__title");
const profileSubtitleInput = document.querySelector(".profile__subtitle");

const cardTitleInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");

const formImgClicked = document.querySelector(".popup__image");
const nameImgClicked = document.querySelector(".popup__figcaption");

const cardsSectionSelector = document.querySelector(".cards");

const keyEsc = 27;
const closePopupEsc = (evt) => {
  if (evt.keyCode === keyEsc) {
    const popupAll = document.querySelector(".popup_opened");
    closePopup(popupAll);
  }
};

const closeButton = document.querySelectorAll(".popup__close-button");
closeButton.forEach((button) => {
  const popup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(popup)); 
});

const closeInPopup = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closeInPopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closeInPopup);
}

function viewPopupImagePic(name, link) {
  formImgClicked.src = link;
  formImgClicked.alt = name;
  nameImgClicked.textContent = name;

  openPopup(popupEditImg);
}

function createCard(data) {
  const card = new Card(data, '#card__template', viewPopupImagePic);
  return card.generateCard();
}

function addNewCard(item) {
  cardsSectionSelector.prepend(item);
}

initialCards.forEach((item) => {
  addNewCard(createCard(item));
});

function clearInput(evt) {
  evt.target.reset();
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  profileTitleInput.textContent = profileNameInput.value;
  profileSubtitleInput.textContent = profileJobInput.value;

  closePopup(popupEditProfile);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const addCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  addNewCard(createCard(addCard));

  closePopup(popupEditCard, clearInput(evt));
}

profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileTitleInput.textContent;
  profileJobInput.value = profileSubtitleInput.textContent;
  
  openPopup(popupEditProfile);
});

cardAddButton.addEventListener('click', function () {
  formCardValidation.disablesSubmitForm();
  openPopup(popupEditCard);
});

newCardInfo.addEventListener('submit', handleFormProfileSubmit);
newCardForm.addEventListener('submit', handleFormAddSubmit);

const profileValidation = new FormValidator(validationOptions, newCardInfo);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(validationOptions, newCardForm);
formCardValidation.enableValidation();