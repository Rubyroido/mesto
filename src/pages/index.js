import './index.css';

import {
  buttonEdit,
  buttonAdd,
  formUser,
  nameInput,
  jobInput,
  formAddPhoto,
  buttonAvatarChange,
  formChangeAvatar,
  popupFormUser,
  popupAddPhoto,
  popupChangeAvatar,
  userName,
  userDescription,
  profileAvatar
} from '../utils/constants.js';

import formValidatorObject from '../utils/formValidatorObject.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42/',
  headers: {
    authorization: 'c420f8b9-4e35-438e-95eb-ba272c384828',
    'Content-Type': 'application/json',
  }
});

const userInfo = new UserInfo(userName, userDescription, profileAvatar);

let userId;

const popupWithPhoto = new PopupWithImage('.popup_type_photo');
popupWithPhoto.setEventListeners();

function handleCardClick(name, link) {
  popupWithPhoto.open(name, link);
}

function handleLike(id) {
  return api.like(id)
};

function handleDeleteLike(id) {
  return api.deleteLike(id)
};

const popupDeleteSubmit = new PopupWithSubmit('.popup_type_delete');

popupDeleteSubmit.setEventListeners();

function renderPlace(data) {
  const card = new Card(data, '#place-template', handleCardClick, userId, handleLike, handleDeleteLike,() => {
    popupDeleteSubmit.open();
    popupDeleteSubmit.submitHandle(() => {
      api.deleteCard(data._id)
        .then(() => {
          card.photoDelete();
          popupDeleteSubmit.close();
        })
        .catch((err) => { console.log(err) })
    })
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(renderPlace(item))
  }
}, '.table');

const formUserValidator = new FormValidator(formValidatorObject, formUser);
const formAddPhotoValidator = new FormValidator(formValidatorObject, formAddPhoto);
const formChangeAvatarValidator = new FormValidator(formValidatorObject, formChangeAvatar)
formUserValidator.enableValidation();
formAddPhotoValidator.enableValidation();
formChangeAvatarValidator.enableValidation();

function renderLoading (isLoading, popup) {
  if (isLoading) {
    popup.querySelector('.popup__button-save').textContent = 'Сохранение...';
  } else {
    popup.querySelector('.popup__button-save').textContent = 'Сохранить';
  }
}

const popupForUserInfo = new PopupWithForm({
  popupSelector: '.popup_type_form-user',
  handleFormSubmit: (item) => {
    renderLoading(true, popupFormUser);
    api.updateProfile(item)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupForUserInfo.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupFormUser);
      })
  ;
  }
});

buttonEdit.addEventListener('click', () => {
  formUserValidator.clearErrors();
  formUserValidator.enableSubmitButton();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
  popupForUserInfo.open();
})

popupForUserInfo.setEventListeners();

const popupForAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    renderLoading(true, popupChangeAvatar);
    console.log(data);
    api.updateAvatar(data.link)
      .then((data) => {
        userInfo.changeAvatar(data.avatar);
        popupForAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupChangeAvatar);
      })
  }
})

buttonAvatarChange.addEventListener('click', () => {
  formChangeAvatarValidator.clearErrors();
  formUserValidator.enableSubmitButton();
  popupForAvatar.open();
})

popupForAvatar.setEventListeners();

const popupForCard = new PopupWithForm({
  popupSelector: '.popup_type_form-photo',
  handleFormSubmit: (item) => {
    renderLoading(true, popupAddPhoto);
    api.createNewCard(item)
      .then((data) => {
        cardsSection.addItem(renderPlace(data));
        popupForCard.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        renderLoading(false, popupAddPhoto);
      })
  }
});

buttonAdd.addEventListener('click', () => {
  formAddPhotoValidator.clearErrors();
  formAddPhotoValidator.disableSubmitButton();
  popupForCard.open();
})

popupForCard.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo(data);
    userInfo.changeAvatar(data.avatar);
    userId = data._id;
    cardsSection.renderItems(items);
  })
  .catch((err) => {
    (console.log(err));
});
