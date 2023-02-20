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
    link: './images/cities/dalaran.jpg',
  },
  {
    name: 'Guilnéas',
    link: './images/cities/guilneas.jpg',
  },
  {
    name: "Kul'Tiras",
    link: './images/cities/kultiras.jpg',
  },
  {
    name: 'Alterac',
    link: './images/cities/ruinsOfAlterac.webp',
  },
  {
    name: 'Ruins of Lordaeron',
    link: './images/cities/ruinsOfLordaeron.jpg',
  },
  {
    name: 'Stormwind',
    link: './images/cities/stormwind.jpg',
  },
  {
    name: 'Stromgarde',
    link: './images/cities/stromgarde.webp',
  },
];

// imageCard
export const imageModal = document.querySelector('#image__modal');
export const fade = document.querySelector('.fade');
export const modalImage = document.querySelector('#modal__image');
export const modalDescription = document.querySelector('#modal__description');

// section

export const posts = '.posts'