export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this.close = this.close.bind(this);
    this.closeWithFade = this.closeWithFade.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  open(arg) {
    const popup = document.querySelector(arg);
    const fade = document.querySelector('.fade');
    popup.classList.remove('popup_closed');
    fade.classList.remove('fade_closed');
    this.renameEditPopupValues();
  }

  openPopupManager() {
    const addButton = document.querySelector('#button__add');
    const profileButton = document.querySelector('.profile__button');
    const avatarEdit = document.querySelector('.cover')
    addButton.addEventListener('click', () => {
      this.open('#add__modal');
      this._handleEscClose();
    });
    profileButton.addEventListener('click', () => {
      this.open('#edit__modal');
      this._handleEscClose();
    });
    avatarEdit.addEventListener('click', () => {
      this.open('#edit__avatar');
      this._handleEscClose();
    });
  }

  close() {
    const popups = document.querySelectorAll('.popup');
    const fade = document.querySelector('.fade');
    popups.forEach((item) => {
      item.classList.add('popup_closed');
      fade.classList.add('fade_closed');
      this.resetValidations();
    });
  }

  _handleEscClose() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
        this.removeEscEvent(e);
      }
    });
  }

  removeEscEvent(e) {
    document.removeEventListener('keydown', e);
  }

  closeWithFade() {
    const fade = document.querySelector('.fade');
    fade.addEventListener('click', this.close);
  }

  setEventListeners() {
    const closeButtons = document.querySelectorAll('.popup__close');
    closeButtons.forEach((item) => {
      item.addEventListener('click', this.close);
    });
    this.closeWithFade()
  }

  resetValidations() {
    const addModal = document.querySelector('#add__button');
    const editModal = document.querySelector('#edit__button');
    const avatarModal = document.querySelector('#avatar__button');
    const deleteModal = document.querySelector('.modal__button_delete');
    addModal.disabled = true;
    editModal.disabled = true;
    avatarModal.disabled = true;
    deleteModal.disabled = false;
    addModal.firstElementChild.classList.add('button__text_disabled');
    editModal.firstElementChild.classList.add('button__text_disabled');
    avatarModal.firstElementChild.classList.add('button__text_disabled');
    deleteModal.firstElementChild.classList.remove('button__text_disabled');
    addModal.classList.add('modal__button_disabled');
    editModal.classList.add('modal__button_disabled');
    avatarModal.classList.add('modal__button_disabled');
    deleteModal.classList.remove('modal__button_disabled');
  }

  renameEditPopupValues() {
    const formName = document.querySelector('.form__name');
    const formStatus = document.querySelector('.form__status');
    const title = document.querySelector('.profile__title');
    const subtitle = document.querySelector('.profile__subtitle');
    formName.value = title.textContent;
    formStatus.value = subtitle.textContent;
  }
}