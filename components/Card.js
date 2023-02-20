import Popup from "./Popup.js";
export default class Card extends Popup {
  constructor({ name, link, cardTemplate, handleCardClick }) {
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
    templateCorpe.querySelector('.post__image').style.backgroundImage = `url(${this._link})`;
  }

  _likeEvent(templateCorpe) {
    const likeButton = templateCorpe.querySelector('.post__button');
    likeButton.addEventListener('click', () => likeButton.classList.toggle('post__button_active'));
  }

  _deletePost(templateCorpe) {
    const deleteButton = templateCorpe.querySelector('.post__delete__image');
    deleteButton.addEventListener('click', (e) => e.target.parentElement.parentElement.parentElement.remove());
  }
}