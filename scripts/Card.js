import {openPhotoPopup} from './index.js';

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPhotoPopup = openPhotoPopup;
  }

  _getTemplate() {
    const place = document.querySelector(this._cardSelector).content.querySelector('.table__cell').cloneNode(true);
    return place;
  }

  _openPopup(name, link) {
    openPhotoPopup(name, link);
  }

  _photoLike() {
    this._element.querySelector('.table__button-like').classList.add('button-like_active');
  }

  _photoDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.table__photo').addEventListener('click', () => {
      this._openPopup(this._name, this._link);
    });
    this._element.querySelector('.table__button-like').addEventListener('click', () => {
      this._photoLike();
    });
    this._element.querySelector('.table__button-delete').addEventListener('click', () => {
      this._photoDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.table__photo').src = this._link;
    this._element.querySelector('.table__photo').alt = `Фотография ${this._name}`;
    this._element.querySelector('.table__photo-name').textContent = this._name;
    return this._element;
  }
}
