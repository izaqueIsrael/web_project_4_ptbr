import Popup from './Popup.js';
import { imageModal, fade, modalImage, modalDescription } from '../utils/constants.js';
export default class PopupWithImage extends Popup {
  constructor() {
    super();
    this._imageModalOpen = this._imageModalOpen.bind(this);
    this._adjustImageWidth = this._adjustImageWidth.bind(this);
  }

  handleCardClick() {
    this.imageEventTarget();
  }

  imageEventTarget() {
    document.querySelectorAll('.posts').forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('post__image')) {
          this._imageCardManager(e);
        }
      });
    });
  }

  _imageCardManager(e) {
    this._adjustImageWidth();
    this._handleEscClose();
    this._imageModalOpen();
    this._renderer(e);
  }

  _renderer(e) {
    const imageSource = e.target.src;
    modalDescription.textContent = this._targetSelector(e);
    modalImage.src = `${imageSource}`;
    modalImage.setAttribute('alt', `${this._targetSelector(e)}`)
  }

  _targetSelector(e) {
    if (e.target.nextElementSibling.classList.contains('post__delete')) {
      const imageTitle = e.target.nextElementSibling.nextElementSibling.firstElementChild.textContent;
      return imageTitle
    }
    else {
      const imageTitle = e.target.nextElementSibling.firstElementChild.textContent;
      return imageTitle
    }
  }

  _imageModalOpen() {
    imageModal.classList.remove('popup_closed');
    fade.classList.remove('fade_closed');
  }

  _adjustImageWidth() {
    const closeButton = document.querySelector('#image__modal_close');
    const imageWidth = modalImage.clientWidth;
    closeButton.style.width = `${imageWidth + 80}px`;
  }
}