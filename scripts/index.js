let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__button_edit');
let userName = profile.querySelector('.profile__name');
let userDescription = profile.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let buttonClose = popup.querySelector('.popup__button_close');
let nameInput = popup.querySelector('.popup__user_name');
let jobInput = popup.querySelector('.popup__user_description');

function popupOpen () {
  popup.classList.add('popup_opened');
}

function popupClose () {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', popupOpen);

buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
}

popupContainer.addEventListener('submit', formSubmitHandler);
popupContainer.addEventListener('submit', popupClose);


