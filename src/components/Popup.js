export class Popup {
    constructor({ popupSelector }) {
        this._popup = document.querySelector(popupSelector)
        this.close = this.close.bind(this)
        this._handleEscClose = this._handleEscClose.bind(this)
    }
  
    close() {
        this._popup.classList.remove('popup_opened')
        //отключение обработчика закрытия через ESC 
        document.removeEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose(evt){
        if(evt.key === 'Escape'){
        this.close()
        }
    }
    open() {
        this._popup.classList.add('popup_opened')
        //включение обработчика закрытия через ESC
        document.addEventListener('keydown', this._handleEscClose)
    }
    setEventListeners() {
        this._handleEscClose.bind(this)
        this._popup.addEventListener('click', (evt) => {
              if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close()
                }
              evt.stopPropagation()
              })
            }
    }
