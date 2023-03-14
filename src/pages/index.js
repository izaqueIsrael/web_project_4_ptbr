import './index.css';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import { validation, formElementsToBeValidated, cardList, apiUser, apiUserCard } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import ImagesRender from '../components/ImagesRender.js';
import { buttonAddIcon, closeIcon, buttonEditIcon, logo, trashIcon, pen } from '../utils/constants.js';

const imagesRender = new ImagesRender();
imagesRender.insertInPage({ local: '.logo', link: logo });
imagesRender.insertInPage({ local: '.edit', link: buttonEditIcon });
imagesRender.insertInPage({ local: '.add', link: buttonAddIcon });
imagesRender.insertInPage({ local: '.popup__icon', link: closeIcon });
imagesRender.insertInPage({ local: '.post__delete__image', link: trashIcon });
document.querySelector('.cover').style.backgroundImage = `url(${pen})`;

const editForm = new PopupWithForm({ form: 'formEdit', firstInput: 'formName', secondInput: 'formDescription' });
const addForm = new PopupWithForm({ form: 'formAdd', firstInput: 'formTitle', secondInput: 'formLink', formNameRange: 40, formStatusRange: 200, formTitleRange: 30 });
const avatarForm = new PopupWithForm({ form: 'formAvatar', firstInput: 'formImage' });
editForm.setEventListeners();
addForm.setEventListeners();
avatarForm.setEventListeners();

const imageCardPopup = new PopupWithImage();

const popup = new Popup;
popup.openPopupManager();
popup.setEventListeners();

const prepareValidations = new FormValidator(validation, formElementsToBeValidated);
prepareValidations.enableValidation();

apiUser.getUserInfo()
  .then(userData => {
    const userInfo = new UserInfo({ name: userData.name, work: userData.about, image: userData.avatar });
    userInfo.setUserInfo();
  })
  .catch(err => console.log(err));

Promise.all([apiUserCard.getUserInfo(), apiUser.getUserInfo()])
  .then(([userData, owner]) => {
    const createCard = (data) => {
      const card = new Card({
        name: data.name,
        link: data.link,
        cardTemplate: '#post__template',
        handleCardClick: imageCardPopup.handleCardClick(),
        like: data.likes,
        id: data._id,
        owner: owner,
        data: data,
        user: apiUserCard
      });
      return card.setElementsInTemplate();
    };
    const section = new Section({ items: userData, renderer: createCard }, cardList);
    section.renderer();
  })
  .catch(err => err);

