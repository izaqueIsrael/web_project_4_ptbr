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

  setUserInfo({ newName, newAbout }) {
    return fetch(this.link, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ about: newAbout, name: newName })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao atualizar informações do usuário');
        }
        return res.json();
      })
      .catch(error => {
        console.error(error);
      });
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
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao atualizar informações do usuário');
        }
        return res.json();
      })
      .catch(error => {
        console.error(error);
      });
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
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao atualizar informações do usuário');
        }
        return res.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.link}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao deletar o cartão');
        }
        return res.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  addLike(cardId, token) {
    return fetch(`${this.link}/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res)
  }

  removeLike(cardId, token) {
    return fetch(`${this.link}/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res)
  }
}