import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super({ popupSelector })
        this._popupImg = this._popup.querySelector('.popup__img')
        this._caption = this._popup.querySelector('.popup__title')
    }

    open(link, name) {
        this._popupImg.src = link
        this._popupImg.alt = `увеличенное изображение ${name}`
        this._caption.textContent = name
        super.open()
    }
}
