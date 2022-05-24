import './index.css';

import {
  buttonEdit,
  userName,
  userDescription,
  buttonAdd,
  popupFormUser,
  formUser,
  nameInput,
  jobInput,
  popupAddPhoto,
  formAddPhoto,
  popupOpenPhoto,
  table
} from '../utils/constants.js';

import initialCards from '../utils/InitialCards.js';
import formValidatorObject from '../utils/formValidatorObject.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formUserValidator = new FormValidator(formValidatorObject, formUser);
const formAddPhotoValidator = new FormValidator(formValidatorObject, formAddPhoto);
formUserValidator.enableValidation();
formAddPhotoValidator.enableValidation();

const popupWithPhoto = new PopupWithImage(popupOpenPhoto);
popupWithPhoto.setEventListeners();

function handleCardClick(name, link) {
  popupWithPhoto.open(name, link);
}

function renderPlace(item) {
  const card = new Card(item.name, item.link, '#place-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(renderPlace(item))
  }
}, table);
cardsSection.renderItems();

const userInfo = new UserInfo({ userNameSelector: userName, userDescriptionSelector: userDescription });

const popupForUserInfo = new PopupWithForm({
  popupSelector: popupFormUser,
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
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

const popupForCard = new PopupWithForm({
  popupSelector: popupAddPhoto,
  handleFormSubmit: (item) => {
    cardsSection.addItem(renderPlace(item));
  }
});

buttonAdd.addEventListener('click', () => {
  formAddPhotoValidator.clearErrors();
  formAddPhotoValidator.disableSubmitButton();
  popupForCard.open();
})

popupForCard.setEventListeners();
