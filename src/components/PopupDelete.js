import { Popup } from './Popup.js'

export class PopupDelete extends Popup {
    constructor ( { popupSelector, formSubmitHandler } ) {
        super({ popupSelector })
        this._formSubmitHandler = formSubmitHandler
    }
    setEventListeners() {
        
    }
}