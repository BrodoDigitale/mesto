import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor ( { popupSelector, formSubmitHandler } ) {
        super({ popupSelector })
        this._formSubmitHandler = formSubmitHandler
        this._form = this._popup.querySelector('.edit-form')
        this._inputList = this._form.querySelectorAll('.edit-form__input');
    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => this._inputValues[input.name] = input.value);
        return this._inputValues;
    }
    setEventListeners() {
        this._form.addEventListener ('submit', evt => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues())
        })
    super.setEventListeners()
    }
    close() {
        this._form.reset()
        super.close()
    }
}