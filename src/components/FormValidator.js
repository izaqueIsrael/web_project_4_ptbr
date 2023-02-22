import { formElementsToBeValidated } from "../utils/constants";

export default class FormValidator {
  constructor(selectors, formsElements) {
    const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, formDescription, buttonTextDisabled, editButton, addButton, inputNameClass, inputStatusClass, inputTitleClass, inputLinkClass } = selectors;
    const { formName, formStatus, formTitle, formLink } = formsElements;
    // Object validation
    this.inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._formDescription = formDescription;
    this._buttonTextDisabled = buttonTextDisabled;
    this._editButton = editButton;
    this._addButton = addButton;
    this._inputNameClass = inputNameClass;
    this._inputStatusClass = inputStatusClass;
    this._inputTitleClass = inputTitleClass;
    this._inputLinkClass = inputLinkClass
    // Object formElementsToBeValidated
    this._formNameSelector = formName.selector;
    this._formStatusSelector = formStatus.selector;
    this._formTitleSelector = formTitle.selector;
    this._formLinkSelector = formLink.selector;
    // Ranges
    this._formNameRange = formName.range;
    this._formStatusRange = formStatus.range;
    this._formTitleRange = formTitle.range
    // Input validation
    this._inputValidation = this._inputValidation.bind(this);
    this._inputWithZeroCharacteresLenght = formElementsToBeValidated.inputWithZeroCharacteresLenght;
    this._inputWithOneCharacter = formElementsToBeValidated.inputWithOneCharacter;
    this._inputEqualToOrGreaterThanTwoCharacteres = formElementsToBeValidated.inputEqualToOrGreaterThanTwoCharacteres;
  }

  //Eu sei que poderia deixar quase que toda essa validação diretamente por html, mas quero manter assim para praticar js

  enableValidation() {
    document
      .querySelectorAll(this.inputSelector)
      .forEach((item) => item.addEventListener('input', this._inputValidation));
  }

  _inputValidation(e) {
    if (e.target.classList.contains(this._formNameSelector))
      this._checkInputValue({ target: e.target, range: this._formNameRange, selector: this._submitButtonSelector, firstFormInputSelector: this._inputNameClass, SecondFormInputSelector: this._inputStatusClass, selectorForButton: this._editButton });
    if (e.target.classList.contains(this._formStatusSelector))
      this._checkInputValue({ target: e.target, range: this._formStatusRange, selector: this._submitButtonSelector, firstFormInputSelector: this._inputNameClass, SecondFormInputSelector: this._inputStatusClass, selectorForButton: this._editButton });
    if (e.target.classList.contains(this._formTitleSelector))
      this._checkInputValue({ target: e.target, range: this._formTitleRange, selector: this._submitButtonSelector, firstFormInputSelector: this._inputTitleClass, SecondFormInputSelector: this._inputLinkClass, selectorForButton: this._addButton });
    if (e.target.classList.contains(this._formLinkSelector))
      this._checkURL(e.target);
  }

  // Manager Functions
  _checkInputValue({ target, range, selector, firstFormInputSelector, SecondFormInputSelector, selectorForButton }) {
    if (target.value.length === this._inputWithZeroCharacteresLenght)
      this._invalidInputValue({ target, text: 'Preencha esse campo', selector, firstFormInputSelector, SecondFormInputSelector, selectorForButton });
    if (target.value.length === this._inputWithOneCharacter || target.value.length > range)
      this._invalidInputValue({ target, text: `Esse campo deve ter de 2 a ${range} caracteres. Esse campo possui ${target.value.length} dígitos`, selector, firstFormInputSelector, SecondFormInputSelector, selectorForButton });
    if (target.value.length >= this._inputEqualToOrGreaterThanTwoCharacteres && target.value.length <= range)
      this._rightCharacteres({ target, firstFormInputSelector, SecondFormInputSelector, selectorForButton });
  }

  _checkURL(arg) {
    if (this._isValidHttpUrl(arg.value) === true)
      this._rightCharacteres({ target: arg, firstFormInputSelector: this._inputTitleClass, SecondFormInputSelector: this._inputLinkClass, selectorForButton: this._addButton });
    else
      this._invalidInputValue({ target: arg, text: 'Por favor, insira um endereço web', selector: this._submitButtonSelector, firstFormInputSelector: this._inputTitleClass, SecondFormInputSelector: this._inputLinkClass, selectorForButton: this._addButton });
  }

  //submanager functions
  _invalidInputValue({ target, text, selector, firstFormInputSelector, SecondFormInputSelector, selectorForButton }) {
    this._addInputError(target);
    this._addTextError({ target, text });
    this._addDisableButton(selector);
    this._formValidationManager({ firstFormInputSelector, SecondFormInputSelector, selectorForButton });
  }

  _rightCharacteres({ target, firstFormInputSelector, SecondFormInputSelector, selectorForButton }) {
    this._removeInputError(target);
    this._removeTextError(target);
    this._formValidationManager({ firstFormInputSelector, SecondFormInputSelector, selectorForButton });
  }

  // Add caracterists Functions
  _addInputError(theTargetInputYouWantToAddAnErrorClass) {
    theTargetInputYouWantToAddAnErrorClass.classList.add(this._inputErrorClass);
  }

  _addTextError({ target, text }) {
    const texto = target.nextElementSibling;
    texto.classList.add(this._formDescription);
    texto.textContent = text;
  }

  _addDisableButton(selector) {
    const botao = document.querySelectorAll(selector);
    botao.forEach((item) => {
      item.disabled = true;
      item.classList.add(this._inactiveButtonClass);
      item.firstElementChild.classList.add(this._buttonTextDisabled);
    });
  }

  // Remove caracterists Functions
  _removeInputError(theTargetInputYouWantToRemoveAnErrorClass) {
    theTargetInputYouWantToRemoveAnErrorClass.classList.remove(this._inputErrorClass);
  }

  _removeTextError(theTargetInputYouWantToRemoveAnErrorMessage) {
    const texto = theTargetInputYouWantToRemoveAnErrorMessage.nextElementSibling;
    texto.classList.remove(this._formDescription);
    texto.textContent = ``;
  }

  _removeDisableButton(selector) {
    const item = document.querySelector(selector);
    item.disabled = false;
    item.classList.remove(this._inactiveButtonClass);
    item.firstElementChild.classList.remove(this._buttonTextDisabled);
  }

  //Verify HTTP
  _isValidHttpUrl(theOnlyUrlAtATimeYouWantToValidate) {
    const regex = /^(http|https):\/\/[^ ']+$/;
    return regex.test(theOnlyUrlAtATimeYouWantToValidate);
  }

  // Verify Form
  _formValidationManager({ firstFormInputSelector, SecondFormInputSelector, selectorForButton }) {
    const theFirstInput = document.querySelector(firstFormInputSelector);
    const theSecondInput = document.querySelector(SecondFormInputSelector);
    if (!theFirstInput.classList.contains(this._inputErrorClass) && !theSecondInput.classList.contains(this._inputErrorClass) && theFirstInput.value != '' && theSecondInput.value != '')
      this._removeDisableButton(selectorForButton);
    else
      this._addDisableButton(selectorForButton);
  }
}