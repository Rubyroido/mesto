export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, handleLike, handleDeleteLike, handleDeleteClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._card = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardId = data._id;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteClick = handleDeleteClick;
    this._element = this._getTemplate();
    this._photo =  this._element.querySelector('.table__photo');
    this._likeButton =  this._element.querySelector('.table__button-like');
    this._deleteButton =  this._element.querySelector('.table__button-delete');
  }

  _getTemplate() {
    const place = this._card.content.querySelector('.table__cell').cloneNode(true);
    return place;
  }

  likeCounter(data) {
    this._likes = data.likes;
    this._element.querySelector('.table__like-counter').textContent = this._likes.length;
  }

  asd() {
    if (this._likes.some((item) => {
      item._id === this._userId
    })) {
      this.like();
    }
  }


  like() {
    this._likeButton.classList.add('button-like_active');
  }

  deleteLike() {
    this._likeButton.classList.remove('button-like_active');
  }

  handleLikeChange(evt) {
    if (
      evt.target.classList.contains('button-like_active')
    ) {
      this._handleDeleteLike(this._cardId)
        .then((data) => {
          this.likeCounter(data);
          this.deleteLike();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._handleLike(this._cardId)
        .then((data) => {
          this.likeCounter(data);
          this.like();
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
    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeButton.addEventListener('click', (evt) => {
      this.handleLikeChange(evt);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    });
  }

  generateCard() {
    this._setEventListeners();
    this._photo.src = this._link;
    this._photo.alt = `Фотография ${this._name}`;
    this._element.querySelector('.table__photo-name').textContent = this._name;

    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }

    if (this._likes.find((item) => (item._id === this._userId))) {
      this.like();
    }

    this.likeCounter(this._data);

    return this._element;
  }
}
