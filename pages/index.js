// Card
import Card from '../components/Card.js';
// Popup
import Popup from '../components/Popup.js';
// addCard Popup
import Section from '../components/Section.js';
// PopupWithImage
import PopupWithImage from '../components/PopupWithImage.js';
// PopupWithForm
import PopupWithForm from '../components/PopupWithForm.js';
// validate Forms
import FormValidator from '../components/FormValidator.js';
// constants
import { validation, formElementsToBeValidated, initialCards, posts } from '../utils/constants.js';
// userInfo
import UserInfo from '../components/UserInfo.js';

// PopupWithForm
const editForm = new PopupWithForm({ form: 'formEdit', firstInput: 'formName', secondInput: 'formDescription' });
const addForm = new PopupWithForm({ form: 'formAdd', firstInput: 'formTitle', secondInput: 'formLink' });
editForm.setEventListeners();
addForm.setEventListeners();

// PopupWithImage
const imageCardPopup = new PopupWithImage();

// Popup
const popup = new Popup;
popup.openPopupManager();
popup.setEventListeners();

//Validate
const prepareValidations = new FormValidator(validation, formElementsToBeValidated);
prepareValidations.enableValidation();

// UserInfo
const userInfo = new UserInfo({ name: 'Othmar Garithos', work: 'I did nothing wrong', image: './images/Garithos_portrait.webp' });
userInfo.setUserInfo();

// Section
const cardList = document.querySelector('.posts');
const createCard = (data) => {
  const card = new Card({ name: data.name, link: data.link, cardTemplate: '#post__template', handleCardClick: imageCardPopup.handleCardClick() });
  return card.setElementsInTemplate();
};
const section = new Section({ items: initialCards, renderer: createCard }, cardList);
section.renderer();
