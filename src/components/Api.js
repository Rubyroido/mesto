// Токен: c420f8b9-4e35-438e-95eb-ba272c384828
// Идентификатор группы: cohort-42
export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  updateProfile(item) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        about: item.description
      })
    })
      .then(this.handleResponse);
  }

  createNewCard(card) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this.handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  like(id) {
    return fetch(`${this.url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  deleteLike(id) {
    return fetch(`${this.url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar })
    })
      .then(this.handleResponse);
  }
}

