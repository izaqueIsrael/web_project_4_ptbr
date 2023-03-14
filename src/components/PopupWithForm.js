import Popup from "./Popup.js";
import { createNewCard } from "../utils/utils.js";
import { apiUser, apiUserCard } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ form, firstInput, secondInput }) {
    super();
    this._form = form;
    this._firstInput = firstInput;
    this._secondInput = secondInput;
  }

  setEventListeners() {
    super.setEventListeners();
    const form = document.forms[this._form];
    const firstInput = form[this._firstInput];
    const secondInput = form[this._secondInput];
    this._getInputValues(form, firstInput, secondInput);
  }

  _getInputValues(form, firstInput, secondInput) {
    if (form.id === 'form__edit')
      this._formEditManager(form, firstInput, secondInput);
    if (form.id === 'form__add')
      this._formAddManager(form, firstInput, secondInput);
    if (form.id === 'form__avatar')
      this._formAvatarManager(form, firstInput);
  }

  // Popup Edit
  _formEditManager(form, firstInput, secondInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitButton = form.querySelector('.button__text');
      submitButton.textContent = 'Salvando...';
      this._newProfileName(firstInput);
      this._newProfileDescription(secondInput);
      apiUser.setUserInfo({ newName: firstInput.value, newAbout: secondInput.value })
        .then(() => {
          submitButton.textContent = 'Salvar';
          form.reset();
          this.close();
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
  _newProfileName(formName) {
    document.querySelector('.profile__title').textContent = formName.value;
  }

  _newProfileDescription(formDescription) {
    document.querySelector('.profile__subtitle').textContent = formDescription.value;
  }

  // Popup Add
  _formAddManager(form, firstInput, secondInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitButton = form.querySelector('.button__text');
      submitButton.textContent = 'Criando...';
      this._addPopupFormInputEvent(firstInput);
      this._addPopupFormInputEvent(secondInput);
      apiUserCard.updateCard({ newName: firstInput.value, newLink: secondInput.value })
        .then(() => {
          submitButton.textContent = 'Criar';
          form.reset();
          form.submit()
          this.close();
        })
        .catch(error => {
          console.error(error);
        });
    });
  }


  _addPopupFormInputEvent(arg) {
    return arg.addEventListener('input', () => arg.value);
  }

  //Avatar
  _formAvatarManager(form, firstInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitButton = form.querySelector('.button__text');
      submitButton.textContent = 'Salvando...';

      this._newProfileAvatar(firstInput);
      apiUser.setUserAvatar(firstInput.value)
        .then(() => {
          submitButton.textContent = 'Salvo';
          form.reset();
          this.close();
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  _newProfileAvatar(firstInput) {
    document.querySelector('.profile__image').src = firstInput.value;
  }

  //API
  _setProfileInfoInApi(firstInput, secondInput) {
    apiUser.setUserInfo({ newName: firstInput.value, newAbout: secondInput.value });
  }

  _setCardInfoInApi(firstInput, secondInput) {
    apiUserCard.updateCard({ newName: firstInput, newLink: secondInput });
  }

  _setAvatarInApi(link) {
    apiUser.setUserAvatar(link);
  }
}