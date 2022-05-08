const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__button-edit');
const userName = profile.querySelector('.profile__name');
const userDescription = profile.querySelector('.profile__description');
const buttonAdd = profile.querySelector('.profile__button-add');

const popupFormUser = document.querySelector('.popup_type_form-user');
const formUser = popupFormUser.querySelector('[name="popup-form"]');
const nameInput = popupFormUser.querySelector('[name="user-name"]');
const jobInput = popupFormUser.querySelector('[name="user-description"]');
const formUserSubmit = popupFormUser.querySelector('.popup__button-save');

const popupAddPhoto = document.querySelector('.popup_type_form-photo');
const formAddPhoto = popupAddPhoto.querySelector('[name="popup-add-photo"]');
const photoNameInput = popupAddPhoto.querySelector('[name="photo-name"]');
const photoUrlInput = popupAddPhoto.querySelector('[name="photo-url"]');
const popupAddPhotoSubmit = popupAddPhoto.querySelector('.popup__button-save_type-photo');

const popupOpenPhoto = document.querySelector('.popup_type_photo')
const popupPhotoContainer = popupOpenPhoto.querySelector('.popup__photo-container');
const popupPhoto = popupOpenPhoto.querySelector('.popup__photo');
const popupPhotoName = popupOpenPhoto.querySelector('.popup__photo-name');

const popupContainer = document.querySelectorAll('.popup__container');
const popupList = document.querySelectorAll('.popup');

const table = document.querySelector('.table');

const placeTemplate = document.querySelector('#place-template');

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

const formValidatorObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_visible'
}

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const formUserValidator = new FormValidator(formValidatorObject, formUser);
const formAddPhotoValidator = new FormValidator(formValidatorObject, formAddPhoto);
formUserValidator.enableValidation();
formAddPhotoValidator.enableValidation();


function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  const inputList = Array.from(formUser.querySelectorAll('.popup__field'));
  inputList.forEach((input) => {
    formUserValidator.hideError(input);
  })
  formUserValidator.enableSubmitButton();
  openPopup(popupFormUser);
});

buttonAdd.addEventListener('click', () => {
  const inputList = Array.from(formAddPhoto.querySelectorAll('.popup__field'));
  inputList.forEach((input) => {
    formAddPhotoValidator.hideError(input);
  })
  formAddPhotoValidator.disableSubmitButton();
  openPopup(popupAddPhoto);
});

popupList.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    };
  });
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  closePopup(popupFormUser);
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
};

popupFormUser.addEventListener('submit', formSubmitHandler);

export function openPhotoPopup(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = `Фотография ${name}`;
  popupPhotoName.textContent = name;
  openPopup(popupOpenPhoto);
}

function renderPlace(name, link) {
  const card = new Card(name, link, '#place-template');
  const cardElement = card.generateCard();
  table.prepend(cardElement);
}

const addPlace = (evt) => {
  evt.preventDefault();
  const name = photoNameInput.value;
  const link = photoUrlInput.value;
  renderPlace(name, link);
  closePopup(popupAddPhoto);
  photoNameInput.value = '';
  photoUrlInput.value = '';
};


const places = initialCards.map((item) => {
  renderPlace(item.name, item.link);
})

popupAddPhoto.addEventListener('submit', addPlace);
