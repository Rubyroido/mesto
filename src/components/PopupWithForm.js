import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
  }

  _getInputValues() {
    this._inputListValues = {};
    this._inputList.forEach(input => {this._inputListValues[input.name] = input.value});
    return this._inputListValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}
