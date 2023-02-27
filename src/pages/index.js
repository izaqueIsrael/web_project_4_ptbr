import './index.css';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import { validation, formElementsToBeValidated, initialCards } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import ImagesRender from '../components/ImagesRender.js';
import { buttonAddIcon, closeIcon, buttonEditIcon, profileImage, logo, trashIcon } from '../utils/constants.js';

const imagesRender = new ImagesRender();
imagesRender.insertInPage({ local: '.logo', link: logo });
imagesRender.insertInPage({ local: '.edit', link: buttonEditIcon });
imagesRender.insertInPage({ local: '.add', link: buttonAddIcon });
imagesRender.insertInPage({ local: '.popup__icon', link: closeIcon });
imagesRender.insertInPage({ local: '.post__delete__image', link: trashIcon });

const editForm = new PopupWithForm({ form: 'formEdit', firstInput: 'formName', secondInput: 'formDescription' });
const addForm = new PopupWithForm({ form: 'formAdd', firstInput: 'formTitle', secondInput: 'formLink', formNameRange: 40, formStatusRange: 200, formTitleRange: 30 });
editForm.setEventListeners();
addForm.setEventListeners();

const imageCardPopup = new PopupWithImage();

const popup = new Popup;
popup.openPopupManager();
popup.setEventListeners();

const prepareValidations = new FormValidator(validation, formElementsToBeValidated);
prepareValidations.enableValidation();

const userInfo = new UserInfo({ name: 'Othmar Garithos', work: 'I did nothing wrong', image: profileImage });
userInfo.setUserInfo();

// ta certo, esse não é mesmo o seletor de imagem, esse id é o id do template e através do template ele copia com o método _getTemplate e coloca os valores com o método _templateCorpeSets através da propriedade templateCorpe.querySelector('.post__image').src = this._link; e logo abaixo dela seta o amado "alt" identicamente ao título do post
// todas as imagens renderizadas possuem alt
// vou até deixar o método privado comentado aqui:
// _templateCorpeSets(templateCorpe) {
//   templateCorpe.querySelector('.post__title').textContent = this._name;
//   templateCorpe.querySelector('.post__image').src = this._link;
//   templateCorpe.querySelector('.post__image').setAttribute('alt', `${this._name}`);
//   templateCorpe.querySelector('.post__delete__image').src = `${trashIcon}`;
//   templateCorpe.querySelector('.post__button').style.backgroundImage = `url(${likeButton})`;
// }\
const cardList = document.querySelector('.posts');
const createCard = (data) => {
  const card = new Card({ name: data.name, link: data.link, cardTemplate: '#post__template', handleCardClick: imageCardPopup.handleCardClick() });
  return card.setElementsInTemplate();
};
const section = new Section({ items: initialCards, renderer: createCard }, cardList);
section.renderer();
