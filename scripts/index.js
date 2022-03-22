let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__button-edit');
let userName = profile.querySelector('.profile__name');
let userDescription = profile.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let buttonClose = popup.querySelector('.popup__button-close');
let nameInput = popup.querySelector('.popup__field_type_name');
let jobInput = popup.querySelector('.popup__field_type_description');

function popupOpen () {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  popup.classList.add('popup_opened');
}

function popupClose () {
  popup.classList.remove('popup_opened');

}

buttonEdit.addEventListener('click', popupOpen);

buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  popupClose();
}

popupContainer.addEventListener('submit', formSubmitHandler);
