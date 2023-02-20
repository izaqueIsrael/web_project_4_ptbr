// Images
import buttonAddIcon from '../images/add.png';
import favicon from '../images/allianceFavicon2.png';
import closeIcon from '../images/close.png';
import buttonEditIcon from '../images/edit.png';
import profileImage from '../images/Garithos_portrait.webp';
import likeButton from '../images/like.svg';
import logo from '../images/logo.svg';
import trashIcon from '../images/trash.svg';
import likeButtonActived from '../images/union.png';
import dalaran from '../images/cities/dalaran.jpg';
import guilneas from '../images/cities/guilneas.jpg';
import kultiras from '../images/cities/kultiras.jpg';
import alterac from '../images/cities/ruinsOfAlterac.webp';
import lordaeron from '../images/cities/ruinsOfLordaeron.jpg';
import stormwind from '../images/cities/stormwind.jpg';
import stromgarde from '../images/cities/stromgarde.webp';

export { buttonAddIcon, favicon, closeIcon, buttonEditIcon, profileImage, likeButton, logo, trashIcon, likeButtonActived };

// FormValidator
export const validation = {
  inputSelector: '.form__input',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'form__input_error',
  formDescription: 'form__description',
  buttonTextDisabled: 'button__text_disabled',
  submitButtonSelector: '.modal__button',
  editButton: '#edit__button',
  addButton: '#add__button',
  inputNameClass: '.form__name',
  inputStatusClass: '.form__status',
  inputTitleClass: '.form__title',
  inputLinkClass: '.form__link'
};

export const formElementsToBeValidated = {
  formName: 'form__name',
  formStatus: 'form__status',
  formTitle: 'form__title',
  formLink: 'form__link',
};

// Card
export const initialCards = [
  {
    name: 'Dalaran',
    link: dalaran,
  },
  {
    name: 'Guilnéas',
    link: guilneas,
  },
  {
    name: "Kul'Tiras",
    link: kultiras,
  },
  {
    name: 'Alterac',
    link: alterac,
  },
  {
    name: 'Ruins of Lordaeron',
    link: lordaeron,
  },
  {
    name: 'Stormwind',
    link: stormwind,
  },
  {
    name: 'Stromgarde',
    link: stromgarde,
  },
];

// imageCard
export const imageModal = document.querySelector('#image__modal');
export const fade = document.querySelector('.fade');
export const modalImage = document.querySelector('#modal__image');
export const modalDescription = document.querySelector('#modal__description');

// section
export const posts = '.posts'