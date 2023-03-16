import Popup from "./Popup.js";
import { likeButton, trashIcon, likeButtonActived } from '../utils/constants.js';
export default class Card extends Popup {
  constructor({ name, link, cardTemplate, handleCardClick, like, id, owner, data, user, deleteEvent }) {
    super()
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._like = like;
    this._id = id;
    this._owner = owner;
    this._data = data;
    this._user = user;
    this._deleteEvent = deleteEvent;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardTemplate).content;
    const templateCorpe = template.querySelector('.post').cloneNode(true);
    return templateCorpe;
  }

  setElementsInTemplate() {
    const templateCorpe = this._getTemplate();
    this._templateCorpeSets(templateCorpe);
    this._likeEvent(templateCorpe);
    this._likedStatus(templateCorpe);
    this._deleteEvent.deletePostEvent(templateCorpe, { owner: this._owner, data: this._data, id: this._id, user: this._user });
    this._removeDeleteButtonToNotOwnersPost(templateCorpe);
    return templateCorpe;
  }

  _removeDeleteButtonToNotOwnersPost(templateCorpe) {
    if (this._data !== undefined && this._owner !== undefined) {
      if (JSON.stringify(this._data.owner) !== JSON.stringify(this._owner)) {
        templateCorpe.firstElementChild.nextElementSibling.remove()
      }
    }
  }


  _templateCorpeSets(templateCorpe) {
    templateCorpe.querySelector('.post__title').textContent = this._name;
    templateCorpe.querySelector('.post__image').src = this._link;
    templateCorpe.querySelector('.post__image').setAttribute('alt', `${this._name}`);
    templateCorpe.querySelector('.post__delete__image').src = `${trashIcon}`;
    templateCorpe.querySelector('.post__button').style.backgroundImage = `url(${likeButton})`;
    templateCorpe.querySelector('.like').textContent = `${this._likeNumber()}`;
    this._likedStatus(templateCorpe);
  }

  _likedStatus(templateCorpe) {
    if (this._data !== undefined && this._owner !== undefined) {
      const liked = this._data.likes.some((likes) => likes._id === this._owner._id);
      if (liked) {
        templateCorpe.querySelector('.post__button').style.backgroundImage = `url(${likeButtonActived})`;
        templateCorpe.querySelector('.post__button').classList.add('post__button_active');
      }
    }
  }

  _likeNumber() {
    if (this._like === undefined)
      return '0';
    else
      return this._like.length;
  }

  _likeEvent(templateCorpe) {
    const like = templateCorpe.querySelector('.post__button');
    like.addEventListener('click', (e) => {
      if (!like.classList.contains('post__button_active')) {
        like.style.backgroundImage = `url(${likeButtonActived})`;
        like.classList.add('post__button_active');
        this._user.addLike(this._id, this._user.token);
        e.target.nextElementSibling.textContent = `${Number(e.target.nextElementSibling.textContent) + 1}`;
      }
      else {
        like.style.backgroundImage = `url(${likeButton})`;
        like.classList.remove('post__button_active');
        this._user.removeLike(this._id, this._user.token);
        e.target.nextElementSibling.textContent = `${Number(e.target.nextElementSibling.textContent) - 1}`;
      }
    });
  }
}