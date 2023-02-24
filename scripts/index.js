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

const popupEditProfile = document.querySelector(".popup_type_info");
const popupEditCard = document.querySelector(".popup_type_card");
const popupEditImg = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close-button");
const profileSaveButton = document.querySelector(".popup__save-button");
const cardAddButton = document.querySelector(".profile__add-button");

const newCardElement = document.querySelector(".popup__form");
const newCardForm = document.querySelector(".popup__form-card");

const profileNameInput = newCardElement.querySelector(".popup__input_type_name");
const profileJobInput = newCardElement.querySelector(".popup__input_type_about");
const profileTitleInput = document.querySelector(".profile__title");
const profileSubtitleInput = document.querySelector(".profile__subtitle");

const cardTitleInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");

const formImgClicked = document.querySelector(".popup__image");
const nameImgClicked = document.querySelector(".popup__figcaption");

const cardsSectionSelector = document.querySelector(".cards");
const cardTemplateSelector = document.querySelector('#card__template').content;

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
const popups = document.querySelectorAll('.popup')

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

function openEditProfileForm() {
  openPopup(popupEditProfile);
  profileNameInput.value = profileTitleInput.textContent;
  profileJobInput.value = profileSubtitleInput.textContent;

}
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitleInput.textContent = profileNameInput.value;
  profileSubtitleInput.textContent = profileJobInput.value;
  closePopup(popupEditProfile)
}

function createNewCard(item) {
  const cardName = item.name;
  const cardLink = item.link;
  const cardAlt = item.name;
  const cardElement = cardTemplateSelector.querySelector(".card__info").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardName;

  const likeButton = cardElement.querySelector(".card__like-button");
  const removeButton = cardElement.querySelector(".card__remove-button");
  const cardImage = cardElement.querySelector(".card__img");

  cardImage.src = cardLink;
  cardImage.alt = cardAlt;

  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like_active-button");
  });

  removeButton.addEventListener("click", (event) => {
    event.target.closest('.card__info').remove();
  });

  cardImage.addEventListener("click", function () {
    formImgClicked.src = cardLink;
    formImgClicked.alt = cardName;
    nameImgClicked.textContent = cardAlt;

    openPopup(popupEditImg);
  });
  return cardElement;
}

const renderCard = (item) => {
  const cardElement = createNewCard(item);
  cardsSectionSelector.prepend(cardElement);
};
initialCards.forEach(card__info => {
  renderCard(card__info);
});


newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard({
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  });


  evt.target.reset();
  closePopup(popupEditCard);
});

cardAddButton.addEventListener("click", function () {
  openPopup(popupEditCard);
  cardTitleInput.value = '';
  cardLinkInput.value = '';
});

newCardElement.addEventListener("submit", submitEditProfileForm);
profileEditButton.addEventListener("click", openEditProfileForm);
profileSaveButton.addEventListener('click', submitEditProfileForm);

