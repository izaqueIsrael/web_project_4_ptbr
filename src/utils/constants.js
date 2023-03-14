// Images
import buttonAddIcon from '../images/add.png';
import closeIcon from '../images/close.png';
import buttonEditIcon from '../images/edit.png';
import profileImage from '../images/Garithos_portrait.webp';
import likeButton from '../images/like.svg';
import logo from '../images/logo.svg';
import trashIcon from '../images/trash.svg';
import likeButtonActived from '../images/union.png';
import pen from '../images/pen.svg'
import Api from '../components/Api';

export { buttonAddIcon, closeIcon, buttonEditIcon, profileImage, likeButton, logo, trashIcon, likeButtonActived, pen };

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
  avatarButton: '.button_avatar',
  inputNameClass: '.form__name',
  inputStatusClass: '.form__status',
  inputTitleClass: '.form__title',
  inputLinkClass: '.form__link',
  inputAvatarClass: '.form__avatar'
};

export const formElementsToBeValidated = {
  formName: { selector: 'form__name', range: 40 },
  formStatus: { selector: 'form__status', range: 200 },
  formTitle: { selector: 'form__title', range: 30 },
  formLink: { selector: 'form__link' },
  formAvatar: { selector: 'form__avatar' },
  inputWithZeroCharacteresLenght: 0,
  inputWithOneCharacter: 1,
  inputEqualToOrGreaterThanTwoCharacteres: 2
};

// imageCard
export const imageModal = document.querySelector('#image__modal');
export const fade = document.querySelector('.fade');
export const modalImage = document.querySelector('#modal__image');
export const modalDescription = document.querySelector('#modal__description');

// section
export const posts = '.posts'

// API
export const cardList = document.querySelector('.posts');
export const apiUser = new Api({ token: 'fd9c323e-e9d0-40a3-963c-a9bd242da440', link: 'https://around.nomoreparties.co/v1/web_ptbr_cohort_02/users/me' });
export const apiUserCard = new Api({ token: 'fd9c323e-e9d0-40a3-963c-a9bd242da440', link: 'https://around.nomoreparties.co/v1/web_ptbr_cohort_02/cards' });
export const newId = Math.random().toString(36).substring(2) + Date.now().toString(36);
const actualDate = new Date();
export const actualDateTime = actualDate.toLocaleString();