import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor ( { popupSelector, data } ) {
        super({ popupSelector })
        this._image = data.link
        this._text = data.name
    }

    open() {
        super.open()
        const popupImg = this._popup.querySelector('.popup__img')
        popupImg.src = this._image
        popupImg.alt = this._text
        document.querySelector('.popup__title').textContent = this._text
    }
}
