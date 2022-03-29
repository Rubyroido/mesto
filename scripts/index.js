let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__button-edit');
let userName = profile.querySelector('.profile__name');
let userDescription = profile.querySelector('.profile__description');
let buttonAdd = profile.querySelector('.profile__button-add');

let popup = document.querySelector('.popup');
let popupAddPhoto = document.querySelector('form[name="popup-add-photo"]');
let popupContainer = popup.querySelector('.popup__container');
let buttonClose = document.querySelectorAll('.popup__button-close');
let nameInput = popup.querySelector('.popup__field_type_name');
let jobInput = popup.querySelector('.popup__field_type_description');
let popupAddPhotoSubmit = document.querySelector('.popup__button-save_type-photo');
let photoNameInput = popupAddPhoto.querySelector('[name="photo-name"]');
let photoUrlInput = popupAddPhoto.querySelector('[name="photo-url"]');
let popupPhotoContainer = document.querySelector('.popup__photo-container');
let popupPhoto = popupPhotoContainer.querySelector('.popup__photo');
let popupPhotoName = popupPhotoContainer.querySelector('.popup__photo-name');

let table = document.querySelector('.table');
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


function popupOpen () {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  popup.classList.add('popup_opened');
}

function popupClose () {
  popup.classList.remove('popup_opened');
  popupAddPhoto.parentElement.classList.remove('popup_opened');
  popupPhotoContainer.parentElement.classList.remove('popup_opened');
}

function popupAddOpen () {
  popupAddPhoto.parentElement.classList.add('popup_opened');
}

buttonEdit.addEventListener ('click', popupOpen);

buttonAdd.addEventListener ('click', popupAddOpen);

buttonClose.forEach(item => item.addEventListener('click', popupClose));

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  popupClose();
}

popupContainer.addEventListener('submit', formSubmitHandler);

function createPlace (name, link) {
  const placeTemplate = document.querySelector('#place-template');
  const place = placeTemplate.content.querySelector('.table__cell').cloneNode(true);
  place.querySelector('.table__photo').src = link;
  place.querySelector('.table__photo-name').textContent = name;

  place.querySelector('.table__photo').addEventListener('click', () => {
    popupPhotoContainer.parentElement.classList.add('popup_opened');
    popupPhoto.src = link;
    popupPhotoName.textContent = name;
  });

  const buttonLike = place.querySelector('.table__button-like');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.add('button-like_active');
  })

  place.querySelector('.table__button-delete').addEventListener('click', () => {
    place.remove();
  })

  return(place);
}

const renderPlace = (name, link) => {
  table.prepend(createPlace(name, link))
}

const addPlace = (evt) => {
  evt.preventDefault();
  const name = photoNameInput.value;
  const link = photoUrlInput.value;
  renderPlace(name, link);
  photoNameInput.value = '';
  photoUrlInput.value = '';
  popupClose();
}

const places = initialCards.map(function(item) {
  return createPlace(item.name,item.link);
})

table.append(...places);
popupAddPhoto.addEventListener('submit', addPlace);
