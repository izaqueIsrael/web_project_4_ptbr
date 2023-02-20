import Popup from "./Popup.js";
import { initialCards } from "../utils/constants.js";
import { createNewCard } from "../utils/utils.js";

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
  }

  // Popup Edit
  _formEditManager(form, firstInput, secondInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._newProfileName(firstInput);
      this._newProfileDescription(secondInput);
      form.reset();
      this.close();
    })
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
      this._addPopupFormInputEvent(firstInput);
      this._addPopupFormInputEvent(secondInput);
      this._newObjectInInitialCardArray(this._auxiliarArray(firstInput.value, secondInput.value));
      createNewCard(firstInput.value, secondInput.value);
      form.reset();
      this.close();
    });
  }

  _addPopupFormInputEvent(arg) {
    return arg.addEventListener('input', () => arg.value);
  }

  _auxiliarArray(name, link) {
    const auxiliar = {
      name: `${name}`,
      link: `${link}`,
    };
    return auxiliar;
  }

  _newObjectInInitialCardArray(arg) {
    initialCards.push(arg);
  }
}