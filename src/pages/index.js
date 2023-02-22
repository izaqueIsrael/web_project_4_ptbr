// CSS
import './index.css';

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
import { validation, formElementsToBeValidated, initialCards } from '../utils/constants.js';

// userInfo
import UserInfo from '../components/UserInfo.js';

// images and icons
import ImagesRender from '../components/ImagesRender.js';
import { buttonAddIcon, closeIcon, buttonEditIcon, profileImage, logo, trashIcon } from '../utils/constants.js';

const imagesRender = new ImagesRender();
imagesRender.insertInPage({ local: '.logo', link: logo });
imagesRender.insertInPage({ local: '.edit', link: buttonEditIcon });
imagesRender.insertInPage({ local: '.add', link: buttonAddIcon });
imagesRender.insertInPage({ local: '.popup__icon', link: closeIcon });
imagesRender.insertInPage({ local: '.post__delete__image', link: trashIcon });

// PopupWithForm
const editForm = new PopupWithForm({ form: 'formEdit', firstInput: 'formName', secondInput: 'formDescription' });
const addForm = new PopupWithForm({ form: 'formAdd', firstInput: 'formTitle', secondInput: 'formLink', formNameRange: 40, formStatusRange: 200, formTitleRange: 30 });
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
const userInfo = new UserInfo({ name: 'Othmar Garithos', work: 'I did nothing wrong', image: profileImage });
userInfo.setUserInfo();

// Section
const cardList = document.querySelector('.posts');
const createCard = (data) => {
  const card = new Card({ name: data.name, link: data.link, cardTemplate: '#post__template', handleCardClick: imageCardPopup.handleCardClick() });
  return card.setElementsInTemplate();
};
const section = new Section({ items: initialCards, renderer: createCard }, cardList);
section.renderer();