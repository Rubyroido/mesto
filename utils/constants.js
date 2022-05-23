export const profile = document.querySelector('.profile');
export const buttonEdit = profile.querySelector('.profile__button-edit');
export const userName = profile.querySelector('.profile__name');
export const userDescription = profile.querySelector('.profile__description');
export const buttonAdd = profile.querySelector('.profile__button-add');

export const popupFormUser = document.querySelector('.popup_type_form-user');
export const formUser = popupFormUser.querySelector('[name="popup-form"]');
export const nameInput = popupFormUser.querySelector('[name="name"]');
export const jobInput = popupFormUser.querySelector('[name="description"]');
export const formUserSubmit = popupFormUser.querySelector('.popup__button-save');

export const popupAddPhoto = document.querySelector('.popup_type_form-photo');
export const formAddPhoto = popupAddPhoto.querySelector('[name="popup-add-photo"]');
export const photoNameInput = popupAddPhoto.querySelector('[name="name"]');
export const photoUrlInput = popupAddPhoto.querySelector('[name="url"]');
export const popupAddPhotoSubmit = popupAddPhoto.querySelector('.popup__button-save_type-photo');

export const popupOpenPhoto = document.querySelector('.popup_type_photo')
export const popupPhotoContainer = popupOpenPhoto.querySelector('.popup__photo-container');
export const popupPhoto = popupOpenPhoto.querySelector('.popup__photo');
export const popupPhotoName = popupOpenPhoto.querySelector('.popup__photo-name');

export const popupContainer = document.querySelectorAll('.popup__container');
export const popupList = document.querySelectorAll('.popup');

export const table = document.querySelector('.table');

export const placeTemplate = document.querySelector('#place-template');
