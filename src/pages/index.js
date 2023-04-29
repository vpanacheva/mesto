import './index.css';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupConfirmation } from '../scripts/components/PopupConfirmation.js';
import { Api } from '../scripts/components/Api.js';
import { initialCards, validationOptions } from '../scripts/constants/constants.js'; 

const popupEditProfile = document.querySelector(".popup_type_info");
const popupEditCard = document.querySelector(".popup_type_card");
const popupEditImg = document.querySelector(".popup_type_image");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

const newCardElement = document.querySelector(".popup__form");
const newCardForm = document.querySelector(".popup__form-card");
const newCardInfo = document.querySelector(".popup__form-info");
const formAvatar = document.querySelector(".popup__form-avatar");

const profileNameInput = newCardElement.querySelector(".popup__input_type_name");
const profileJobInput = newCardElement.querySelector(".popup__input_type_about");
const profileTitleInput = document.querySelector(".profile__title");
const profileSubtitleInput = document.querySelector(".profile__subtitle");

const cardTitleInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");

const formImgClicked = document.querySelector(".popup__image");
const nameImgClicked = document.querySelector(".popup__figcaption");

const cardsSectionSelector = document.querySelector(".cards");
const avatarEditButton = document.querySelector('.profile__avatar-button');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '787ad5f3-39d7-4f9d-b69d-9a289249a061',
    'Content-Type': 'application/json;  character=UTF-8',
  }
})
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    user.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });


  const popupViewImage = new PopupWithImage('.popup_type_image')
  popupViewImage.setEventListeners();
  function viewPopupImagePic(name, link) {
    popupViewImage.open(name, link);
  }
  function inputsProfileInfo(data){
    profileNameInput.value = data.name;
    profileJobInput.value = data.about;
  }

const user = new UserInfo({ nameSelector: '.profile__title', aboutSelector: '.profile__subtitle', avatarSelector: '.profile__avatar-img'});

const popupConfirm = new PopupConfirmation('.popup_type_delete');
popupConfirm.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_info',  (inputs) => {
  popupProfile.renderLoading(true, 'Сохраняем...');
  api
    .editUserInfo(inputs)
    .then((inputs) => {
      user.setUserInfo(inputs);
      popupProfile.close();
      console.log(inputs);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false, 'Сохранить');
    });
});
popupProfile.setEventListeners();

 profileEditButton.addEventListener('click', () => {
  const userInfoProfile = user.getUserInfo();
  inputsProfileInfo({
    name: userInfoProfile.name,
    about: userInfoProfile.about,
  });
  popupProfile.open();
  profileValidation.disablesSubmitForm();
});

const popupAvatar = new PopupWithForm('.popup_type-avatar', (data) => {
  popupAvatar.renderLoading(true, 'Сохраняем...');
  api.editUserAvatar(data)
    .then((data) => {
      user.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false, 'Сохранить');
    });
});
popupAvatar.setEventListeners();


avatarEditButton.addEventListener('click', () => { 
  popupAvatar.open();
})

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      userId: user.getUserId(),
      viewPopupImage: () => {
        viewPopupImagePic(data);
      },
      handleCardDelete: () => {
        popupConfirm.open();
        popupConfirm.setSubmit(() => {
          popupConfirm.renderLoading(true, 'Удаляем...');
          api
            .removeCardApi(card.getId())
            .then(() => {
              card.removeCard();
              popupConfirm.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              popupConfirm.renderLoading(false, 'Да');
            });
        });
      },
      handleCardLike: () => {
        api
          .addCardLike(card.getId())
          .then((data) => {
            card.cardLiked(data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleRemoveLike: () => {
        api
          .removeCardLike(card.getId())
          .then((data) => {
            card.cardLiked(data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    '#card__template'
  );
  return card.generateCard();
};

const cardsList = new Section({ renderer: (item) => {
  cardsList.addItem(createCard(item));
}}, cardsSectionSelector);

const popupAddCard = new PopupWithForm('.popup_type_card', (data) => {
  popupAddCard.renderLoading(true, 'Создаем...');
  api.addCards(data)
    .then((data) => {
      cardsList.addItem(createCard(data));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false, 'Создать');
    });
});
popupAddCard.setEventListeners();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
  formCardValidation.disablesSubmitForm();
});

cardAddButton.addEventListener('click', () => { 
  popupAddCard.open();
  formCardValidation.disablesSubmitForm();
})
const profileValidation = new FormValidator(validationOptions, newCardInfo);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(validationOptions, newCardForm);
formCardValidation.enableValidation();

const formAvatarValidation = new FormValidator(validationOptions, formAvatar);
formAvatarValidation.enableValidation();




