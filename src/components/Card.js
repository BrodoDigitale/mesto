
//К Л А С С  К А Р Т О Ч К И

export class Card {
    //создание конструктра класса карточки
    constructor ({ data, cardSelector, userId, handleCardClick, handlelikeClick, handleDeleteClick}) {
        this._text = data.name
        this._image = data.link
        this._ownerId = data.owner._id
        this._id = data._id
        this._myId = userId
        this._likes = data.likes
        this._cardSelector = cardSelector
        this._handleCardClick = handleCardClick
        this._handleLikeClick = handlelikeClick
        this._handleDeleteClick = handleDeleteClick
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
    _setEventListeners() {
      //добавление лайка
      this._likeButton.addEventListener('click', () => this._handleLikeClick(this, this._id))
      //добавление корзины
      this._element.querySelector('.elements__delete-btn').addEventListener('click', () => this._handleDeleteClick())
      //добавление вызова попапа
      this._element.querySelector('.elements__img').addEventListener('click', () => this._handleCardClick())
    }
    _displayBin() {
      if(this._ownerId !== this._myId) {
      this._element.querySelector('.elements__delete-btn').classList.add('elements__delete-btn_disabled')
      } 
    }
    _displayLiked() {
      if (this.isLiked()) {
        this._likeButton.classList.add('elements__like-icon_active')
      }
    }
    isLiked() {
      return this._likes.some((like) => {
        return like._id == this._myId   
      })
    }

    updateLikes(data) {
      this._likeButton.classList.toggle('elements__like-icon_active')
      this._likesCounter.textContent = data.likes.length
      this._likes = data.likes
    }
    //Публичный метод для добавления данных в карточку и ее отрисовки в DOM
    generateCard(){
      this._element = this._getTemplate()
      this._likeButton = this._element.querySelector('.elements__like-icon')
      this._cardImg = this._element.querySelector('.elements__img')
      this._cardTitle = this._element.querySelector('.elements__title-text')
      this._likesCounter = this._element.querySelector('.elements__like-number')
      this._likesCounter.textContent = this._likes.length
      this._cardImg.src = this._image
      this._cardImg.alt = this._text
      this._cardTitle.textContent = this._text
      this._displayBin()
      this._displayLiked()
      this._setEventListeners()
      return this._element
    }
    deleteCard() {
      this._element.remove()
    }
}

