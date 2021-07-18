import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor ( { popupSelector, formSubmitHandler } ) {
        super({ popupSelector })
        this._formSubmitHandler = formSubmitHandler
    }
    _getInputValues() {
        const placeInput = this._popup.querySelector('.edit-form__input_value_place')
        const placePhotoInput = this._popup.querySelector('.edit-form__input_value_placePhoto')
        const inputValues = {name: `${placeInput.value}`, link: `${placePhotoInput.value}`}
        return inputValues
    }
    setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener ('submit', evt => {
    this._formSubmitHandler()
    this.close()
    })

    }
    close() {
        super.close()
        const form = this._popup.querySelector('.edit-form')
        form.reset()
    }
}