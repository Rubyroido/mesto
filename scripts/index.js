const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__button-edit');
const userName = profile.querySelector('.profile__name');
const userDescription = profile.querySelector('.profile__description');
const buttonAdd = profile.querySelector('.profile__button-add');

const popupFormUser = document.querySelector('.popup_type_form-user');
const formUser = popupFormUser.querySelector('[name="popup-form"]');
const nameInput = popupFormUser.querySelector('[name="user-name"]');
const jobInput = popupFormUser.querySelector('[name="user-description"]');
const popupFormUserClose = document.querySelector('.popup__button-close_type-user');

const popupAddPhoto = document.querySelector('.popup_type_form-photo');
const formAddPhoto = popupAddPhoto.querySelector('[name="popup-add-photo"]');
const photoNameInput = popupAddPhoto.querySelector('[name="photo-name"]');
const photoUrlInput = popupAddPhoto.querySelector('[name="photo-url"]');
const popupAddPhotoSubmit = popupAddPhoto.querySelector('.popup__button-save_type-photo');
const popupAddPhotoClose = popupAddPhoto.querySelector('.popup__button-close_type-photo-add');

const popupOpenPhoto = document.querySelector('.popup_type_photo')
const popupPhotoContainer = popupOpenPhoto.querySelector('.popup__photo-container');
const popupPhoto = popupOpenPhoto.querySelector('.popup__photo');
const popupPhotoName = popupOpenPhoto.querySelector('.popup__photo-name');
const popupOpenPhotoClose = popupOpenPhoto.querySelector('.popup__button-close_type-photo-card');

const popupContainer = document.querySelectorAll('.popup__container');

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


function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

buttonEdit.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  openPopup(popupFormUser);
  const form = popupFormUser.querySelector('.popup__container');
  const inputList = Array.from(form.querySelectorAll('.popup__field'));
  const buttonElement = form.querySelector('.popup__button-save');
  inputList.forEach((input) => {
    checkInputValidity(form, input, {inputErrorClass: 'popup__field_invalid', errorClass: 'popup__error_visible'});
    toggleButtonState (inputList, buttonElement, 'popup__button-save_inactive');
  });
});

popupFormUserClose.addEventListener('click', function () {
  closePopup(popupFormUser);
});

popupFormUser.addEventListener('click', function (evt) {
  if (!(evt.target === formUser || formUser.contains(evt.target))) {
    closePopup(popupFormUser);
  };
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popupFormUser);
  };
});

buttonAdd.addEventListener('click', function () {
  openPopup(popupAddPhoto);
  const form = popupAddPhoto.querySelector('.popup__container');
  const inputList = Array.from(form.querySelectorAll('.popup__field'));
  const buttonElement = form.querySelector('.popup__button-save');
  inputList.forEach(() => {
    toggleButtonState (inputList, buttonElement, 'popup__button-save_inactive');
  });
});

popupAddPhotoClose.addEventListener('click', function () {
  closePopup(popupAddPhoto);
});

popupAddPhoto.addEventListener('click', function (evt) {
  if (!(evt.target === formAddPhoto || formAddPhoto.contains(evt.target))) {
    closePopup(popupAddPhoto);
  };
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popupAddPhoto);
  };
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  closePopup(popupFormUser);
};

popupFormUser.addEventListener('submit', formSubmitHandler);

function createPlace(name, link) {
  const place = placeTemplate.content.querySelector('.table__cell').cloneNode(true);
  const placePhoto = place.querySelector('.table__photo');
  placePhoto.src = link;
  placePhoto.alt = `Фотография ${name}`;
  place.querySelector('.table__photo-name').textContent = name;

  placePhoto.addEventListener('click', () => {
    popupPhoto.src = link;
    popupPhoto.alt = `Фотография ${name}`;
    popupPhotoName.textContent = name;
    openPopup(popupOpenPhoto);
  });

  popupOpenPhotoClose.addEventListener('click', () => {
    closePopup(popupOpenPhoto);
  });

  popupOpenPhoto.addEventListener('click', (evt) => {
    if (!(evt.target === popupPhotoContainer || popupPhotoContainer.contains(evt.target))) {
      closePopup(popupOpenPhoto);
    };
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupOpenPhoto);
    };
  });

  const buttonLike = place.querySelector('.table__button-like');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.add('button-like_active');
  });

  place.querySelector('.table__button-delete').addEventListener('click', () => {
    place.remove();
  });

  return (place);
}

const renderPlace = (name, link) => {
  table.prepend(createPlace(name, link));
};

const addPlace = (evt) => {
  evt.preventDefault();
  const name = photoNameInput.value;
  const link = photoUrlInput.value;
  renderPlace(name, link);
  closePopup(popupAddPhoto);
  photoNameInput.value = '';
  photoUrlInput.value = '';
};

const places = initialCards.map(function (item) {
  return createPlace(item.name, item.link);
});

table.append(...places);
popupAddPhoto.addEventListener('submit', addPlace);
