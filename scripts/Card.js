
//К Л А С С  К А Р Т О Ч К И
import { openPopup } from './Utils.js'
export class Card {
    //создание конструктра класса карточки
    constructor (text, image, openPopup) {
        this._text = text
        this._image = image
        this._openPopup = openPopup
    }
    //создание шаблрна разметки внутри класса
    _getTemplate() {
        const cardTemplate = document.querySelector('.template')
        .content
        .querySelector('.elements__item')
        .cloneNode(true)
        return cardTemplate
    }
    //навешивание слушателей
    _setEventListeners(openPopup){
   //Навешиваю слушатель для лайка 
      this._element.querySelector('.elements__like-icon').addEventListener('click', evt => {
      evt.target.classList.toggle('elements__like-icon_active')
    });
    //Навешиваю слушатель для иконки удаления
      this._element.querySelector('.elements__delete-btn').addEventListener('click', evt => {
      evt.target.closest('.elements__item').remove()
    });
    //Навешиваю слушатель для вызова попапа через картинку
    this._element.querySelector('.elements__img').addEventListener('click', () => {
      const popupShowImg = document.querySelector('.popups .popup_show-image')
      openPopup(popupShowImg);
      document.querySelector('.popup__img').src = this._image
      document.querySelector('.popup__title').alt = this._text
      document.querySelector('.popup__title').textContent = this._text
    });
    }
    //Публичный метод для добавления данных в карточку и ее отрисовки в DOM
    generateCard(){
      this._element = this._getTemplate()
      this._setEventListeners(openPopup)
      this._element.querySelector('.elements__img').src = this._image
      this._element.querySelector('.elements__img').alt = this._text
      this._element.querySelector('.elements__title-text').textContent = this._text 
      return this._element
    }
}








//СТАРЫЙ КОД Р А Б О Т А  С  К А Р Т О Ч К А М И 
  //Функция создания карточки + в сразу навешивание на нее слушателей 
  //Выбираю темплейт (что вставлять)
  /*const cardTemplate = document.querySelector('.template').content;
  function createCard(card) {
   //Клонирую темплейт
   const createdCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
   //определяю атрибуты элементов
   const elementsImg = createdCard.querySelector('.elements__img');
   elementsImg.src = card.link;
   elementsImg.alt = card.name;
   createdCard.querySelector('.elements__title-text').textContent = card.name;
   //Навешиваю слушатель для лайка 
   createdCard.querySelector('.elements__like-icon').addEventListener('click', evt => {
     evt.target.classList.toggle('elements__like-icon_active');
   });
   //Навешиваю слушатель для иконки удаления
   createdCard.querySelector('.elements__delete-btn').addEventListener('click', evt => {
     evt.target.closest('.elements__item').remove();
   });
   //Навешиваю слушатель для вызова попапа через картинку
   elementsImg.addEventListener('click', () => {
     openPopup(popupShowImg);
     popupShowImgPicture.src = card.link;
     popupShowImgPicture.alt = card.name;
     popupShowImgTitle.textContent = card.name;
   });
   return createdCard;
  }
  function renderCards() {
   const result = initialCards.map(function(item) {
       return createCard(item);
   });
   cards.append(...result)
 }
   renderCards();*/
 