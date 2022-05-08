// function showError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// function hideError(formElement, inputElement, { inputErrorClass, errorClass }) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// function checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass }) {
//   if (!inputElement.validity.valid) {
//     showError(formElement, inputElement, inputElement.validationMessage, { inputErrorClass, errorClass });
//   } else {
//     hideError(formElement, inputElement, { inputErrorClass, errorClass });
//   }
// };

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(inactiveButtonClass);
//   };
// };

// function setEventListeners(formElement, { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass }) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass });
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// };

// function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass });
//   });
// };

// enableValidation({
//   formSelector: '.popup__container',
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__button-save',
//   inactiveButtonClass: 'popup__button-save_inactive',
//   inputErrorClass: 'popup__field_invalid',
//   errorClass: 'popup__error_visible'
// });

export class FormValidator {
  constructor(object, formElement) {
    this._object = object;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._object.inputSelector));
    this._submitButton = this._formElement.querySelector(this._object.submitButtonSelector);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._object.inputErrorClass);
    errorElement.classList.remove(this._object.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._object.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._object.inactiveButtonClass);
    };
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

