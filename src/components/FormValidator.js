export default class FormValidator {
  constructor(arg1, arg2) {
    const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, formDescription, buttonTextDisabled, editButton, addButton, inputNameClass, inputStatusClass, inputTitleClass, inputLinkClass } = arg1;
    const { formName, formStatus, formTitle, formLink } = arg2;
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
    this._formName = formName;
    this._formStatus = formStatus;
    this._formTitle = formTitle;
    this._formLink = formLink;
    // Input validation
    this._inputValidation = this._inputValidation.bind(this);
  }

  enableValidation() {
    document
      .querySelectorAll(this.inputSelector)
      .forEach((item) => item.addEventListener('input', this._inputValidation));
  }

  _inputValidation(e) {
    if (e.target.classList.contains(this._formName))
      this._checkInputValue({ target: e.target, range: Number(40), selector: this._submitButtonSelector, selectorInput1: this._inputNameClass, selectorInput2: this._inputStatusClass, selectorForButton: this._editButton });
    if (e.target.classList.contains(this._formStatus))
      this._checkInputValue({ target: e.target, range: Number(200), selector: this._submitButtonSelector, selectorInput1: this._inputNameClass, selectorInput2: this._inputStatusClass, selectorForButton: this._editButton });
    if (e.target.classList.contains(this._formTitle))
      this._checkInputValue({ target: e.target, range: Number(30), selector: this._submitButtonSelector, selectorInput1: this._inputTitleClass, selectorInput2: this._inputLinkClass, selectorForButton: this._addButton });
    if (e.target.classList.contains(this._formLink))
      this._checkURL(e.target);
  }

  // Manager Functions
  _checkInputValue({ target, range, selector, selectorInput1, selectorInput2, selectorForButton }) {
    if (target.value.length === 0)
      this._invalidInputValue({ target, text: 'Preencha esse campo', selector, selectorInput1, selectorInput2, selectorForButton });
    if (target.value.length === 1 || target.value.length > range)
      this._invalidInputValue({ target, text: `Esse campo deve ter de 2 a ${range} caracteres. Esse campo possui ${target.value.length} dígitos`, selector, selectorInput1, selectorInput2, selectorForButton });
    if (target.value.length >= 2 && target.value.length <= range)
      this._rightCharacteres({ target, selectorInput1, selectorInput2, selectorForButton });
  }

  _checkURL(arg) {
    if (this._isValidHttpUrl(arg.value) == true)
      this._rightCharacteres({ target: arg, selectorInput1: this._inputTitleClass, selectorInput2: this._inputLinkClass, selectorForButton: this._addButton });
    else
      this._invalidInputValue({ target: arg, text: 'Por favor, insira um endereço web', selector: this._submitButtonSelector, selectorInput1: this._inputTitleClass, selectorInput2: this._inputLinkClass, selectorForButton: this._addButton });
  }

  //submanager functions
  _invalidInputValue({ target, text, selector, selectorInput1, selectorInput2, selectorForButton }) {
    this._addInputError(target);
    this._addTextError({ target, text });
    this._addDisableButton(selector);
    this._formValidationManager({ selectorInput1, selectorInput2, selectorForButton });
  }

  _rightCharacteres({ target, selectorInput1, selectorInput2, selectorForButton }) {
    this._removeInputError(target);
    this._removeTextError(target);
    this._formValidationManager({ selectorInput1, selectorInput2, selectorForButton });
  }

  // Add caracterists Functions
  _addInputError(arg) {
    arg.classList.add(this._inputErrorClass);
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
  _removeInputError(arg) {
    arg.classList.remove(this._inputErrorClass);
  }

  _removeTextError(arg) {
    const texto = arg.nextElementSibling;
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
  _isValidHttpUrl(arg) {
    const regex = /^(http|https):\/\/[^ ']+$/;
    return regex.test(arg);
  }

  // Verify Form
  _formValidationManager({ selectorInput1, selectorInput2, selectorForButton }) {
    const input1 = document.querySelector(selectorInput1);
    const input2 = document.querySelector(selectorInput2);
    if (!input1.classList.contains(this._inputErrorClass) && !input2.classList.contains(this._inputErrorClass) && input1.value != '' && input2.value != '')

      this._removeDisableButton(selectorForButton);

    else
      this._addDisableButton(selectorForButton);
  }
}