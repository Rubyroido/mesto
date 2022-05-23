import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupPhotoName = this._popup.querySelector('.popup__photo-name');
  }

  open(name, link) {
    super.open();
    this._popupPhoto.src = link;
    this._popupPhoto.alt = `Фотография ${name}`;
    this._popupPhotoName.textContent = name;
  }
}
