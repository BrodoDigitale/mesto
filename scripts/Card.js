
//К Л А С С  К А Р Т О Ч К И
import { openPopup } from './Utils.js'

export class Card {
    //создание конструктра класса карточки
    constructor (data, cardSelector, openPopup) {
        this._text = data.name
        this._image = data.link
        this._cardSelector = cardSelector
        this._openPopup = openPopup
    }
    //создание шаблона разметки внутри класса
    _getTemplate() {
        const newCardTemplate = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elements__item')
        .cloneNode(true)
        return newCardTemplate
    }
    //навешивание обработчиков
    
   //Обработчик для лайка 
    _likeEventListener() {
      this._element.querySelector('.elements__like-icon').addEventListener('click', evt => {
      evt.target.classList.toggle('elements__like-icon_active')
    })
   }
    //Обработчик для иконки удаления
    _removeEventListener() {
        this._element.querySelector('.elements__delete-btn').addEventListener('click', evt => {
        evt.target.closest('.elements__item').remove()
      })
    }
    //Обработчик для вызова попапа через картинку
    _openImageEventListener(openPopup){
    this._element.querySelector('.elements__img').addEventListener('click', () => {
      const popupShowImg = document.querySelector('.popups .popup_show-image')
      openPopup(popupShowImg)
      document.querySelector('.popup__img').src = this._image
      document.querySelector('.popup__img').alt = this._text
      document.querySelector('.popup__title').textContent = this._text
    })
    }
    //Публичный метод для добавления данных в карточку и ее отрисовки в DOM
    generateCard(){
      this._element = this._getTemplate()
      this._likeEventListener()
      this._removeEventListener()
      this._openImageEventListener(openPopup)
      const cardImg = this._element.querySelector('.elements__img')
      const cardTitle = this._element.querySelector('.elements__title-text')
      cardImg.src = this._image
      cardImg.alt = this._text
      cardTitle.textContent = this._text 
      return this._element
    }
}
