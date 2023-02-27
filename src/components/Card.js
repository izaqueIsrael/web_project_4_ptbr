import Popup from "./Popup.js";
import { likeButton, trashIcon, likeButtonActived } from '../utils/constants.js';
export default class Card extends Popup {
  constructor({ name, link, cardTemplate, handleCardClick, vars }) {
    super()
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
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
    this._deletePost(templateCorpe);
    this._handleCardClick;
    return templateCorpe;
  }

  _templateCorpeSets(templateCorpe) {
    templateCorpe.querySelector('.post__title').textContent = this._name;
    templateCorpe.querySelector('.post__image').src = this._link;
    templateCorpe.querySelector('.post__image').setAttribute('alt', `${this._name}`);
    templateCorpe.querySelector('.post__delete__image').src = `${trashIcon}`;
    templateCorpe.querySelector('.post__button').style.backgroundImage = `url(${likeButton})`;
  }

  _likeEvent(templateCorpe) {
    const like = templateCorpe.querySelector('.post__button');
    like.addEventListener('click', () => {
      if (!like.classList.contains('post__button_active')) {
        like.style.backgroundImage = `url(${likeButtonActived})`;
        like.classList.add('post__button_active');
      }
      else {
        like.style.backgroundImage = `url(${likeButton})`;
        like.classList.remove('post__button_active');
      }
    });
  }
  //
  // likeButton.addEventListener('click', () => likeButton.classList.toggle('post__button_active'));

  _deletePost(templateCorpe) {
    const deleteButton = templateCorpe.querySelector('.post__delete__image');
    deleteButton.addEventListener('click', (e) => e.target.parentElement.parentElement.parentElement.remove());
  }
}