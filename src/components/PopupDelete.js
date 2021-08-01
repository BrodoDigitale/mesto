import { Popup } from './Popup.js'

export class PopupDelete extends Popup {
    constructor ( { popupSelector, formSubmitHandler } ) {
        super({ popupSelector })
        this._formSubmitHandler = formSubmitHandler
    }
    setEventListeners() {
        this._popup.addEventListener ('submit', evt => {
            evt.preventDefault();
            this._formSubmitHandler(this._card)
        })
        super.setEventListeners()  
    }
    setCard(card) {
        this._card = card
    }
}