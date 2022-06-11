export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleLike, handleDeleteLike, handleDeleteClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardId = data._id;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const place = document.querySelector(this._cardSelector).content.querySelector('.table__cell').cloneNode(true);
    return place;
  }

  likeCounter(data) {
    this._likes = data.likes;
    this._element.querySelector('.table__like-counter').textContent = this._likes.length;
  }

  like() {
    this._element.querySelector('.table__button-like').classList.add('button-like_active');
  }

  deleteLike() {
    this._element.querySelector('.table__button-like').classList.remove('button-like_active');
  }

  handleLikeChange() {
    if (
      this._likes.some((item) => {
      item._id === this._userId
    })) {
      this._handleDeleteLike(this._cardId)
        .then((data) => {
          this.likeCounter(data);
          this.deleteLike()
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._handleLike(this._cardId)
        .then((data) => {
          this.likeCounter(data);
          this.like()
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  photoDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.table__photo').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector('.table__button-like').addEventListener('click', () => {
      this.handleLikeChange();
    });
    this._element.querySelector('.table__button-delete').addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);

    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.table__photo').src = this._link;
    this._element.querySelector('.table__photo').alt = `Фотография ${this._name}`;
    this._element.querySelector('.table__photo-name').textContent = this._name;

    if (this._userId !== this._ownerId) {
      this._element.querySelector('.table__button-delete').remove();
    }

    if (this._likes.some((item) => {
      item._id === this._userId
    })) {
      this.like();
    }

    this.likeCounter(this._data);

    return this._element;
  }
}
