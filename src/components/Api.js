import { apiUser, newId, actualDateTime } from "../utils/constants.js";
export default class Api {
  constructor({ token, link }) {
    this.token = token;
    this.link = link;
  }

  getUserInfo() {
    return fetch(this.link, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json());
  }

  _checkTheApiResponse(res) {
    {
      if (!res.ok) {
        return Promise.reject(`${res.status} error!`);
      }
      return res.json();
    }
  }

  setUserInfo({ newName, newAbout }) {
    return fetch(this.link, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ about: newAbout, name: newName })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  setUserAvatar(image) {
    return fetch(`${this.link}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: image })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  updateCard({ newName, newLink }) {
    return fetch(this.link, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ createAt: actualDateTime, likes: [], link: `${newLink}`, name: `${newName}`, owner: apiUser.getUserInfo(), _id: newId })
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.link}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  addLike(cardId, token) {
    return fetch(`${this.link}/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => this._checkTheApiResponse(res));
  }

  removeLike(cardId, token) {
    return fetch(`${this.link}/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => this._checkTheApiResponse(res));
  }
}