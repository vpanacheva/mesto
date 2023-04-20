import './index.css';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';

import { PopupWithImage } from '../scripts/components/PopupWithImage.js';

import { PopupWithForm } from '../scripts/components/PopupWithForm.js';

import { UserInfo } from '../scripts/components/UserInfo.js';
import { initialCards, validationOptions } from '../scripts/constants/constants.js'; 

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

const user = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle'});

function createCard(data) {
  const card = new Card (data, '#card__template', viewPopupImagePic);
  return card.generateCard();
}

const cardsList = new Section({ items: initialCards, renderer: (item) => {
  cardsList.addItem(createCard(item));
}}, cardsSectionSelector);

cardsList.renderItems();

const popupProfile = new PopupWithForm('.popup_type_info', (inputs) => {
  user.setUserInfo(inputs);
  popupProfile.close();
});
popupProfile.setEventListeners();

function popupProfileOpen({ name, about}) {
  profileNameInput.value = name;
  profileJobInput.value = about;

  popupProfile.open();
}
profileEditButton.addEventListener('click', () => {
  popupProfileOpen(user.getUserInfo());
  profileValidation.disablesSubmitForm();
})

const popupAddCard= new PopupWithForm('.popup_type_card', ({ name, link }) => {
  cardsList.addItem(createCard({ name, link }));
  popupAddCard.close();
})
popupAddCard.setEventListeners();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  formCardValidation.disablesSubmitForm();
})

const popupViewImage = new PopupWithImage('.popup_type_image')
popupViewImage.setEventListeners();

function viewPopupImagePic(name, link) {
  popupViewImage.open(name, link);
}
const profileValidation = new FormValidator(validationOptions, newCardInfo);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(validationOptions, newCardForm);
formCardValidation.enableValidation();

