//Массив карточек:
const initialCards = [
    {
      name: 'Чердынь',
      link: 'https://i.postimg.cc/ZncK5Bjp/image.jpg'
    },
    {
      name: 'Кунгур',
      link: 'https://i.postimg.cc/vB5ZCSVP/image.jpg'
    },
    {
      name: 'Хохловка',
      link: 'https://i.postimg.cc/rscwTCGq/image.jpg'
    },
    {
      name: 'Чусовая',
      link: 'https://i.postimg.cc/8Ppzn4PH/image.jpg'
    },
    {
      name: 'Пермь',
      link: 'https://i.postimg.cc/Pfzq49hJ/image.jpg'
    },
    {
      name: 'Зюраткуль',
      link: 'https://i.postimg.cc/nLyLRtCj/image.jpg'
    }
  ]; 

//К Л А С С  К А Р Т О Ч К И
export class Card {
    //создание конструктра класса карточки
    constructor (text, image) {
        this._text = text
        this._image = image
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
    _setEventListeners(){
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
      openPopup(popupShowImg);
      popupShowImgPicture.src = this._image
      popupShowImgPicture.alt = this._text
      popupShowImgTitle.textContent = this._text
    });
    }
    //Публичный метод для добавления данных в карточку и ее отрисовки в DOM
    generateCard(){
      this._element = this._getTemplate()
      this._setEventListeners()
      this._element.querySelector('.elements__img').src = this._image
      this._element.querySelector('.elements__img').alt = this._text
      this._element.querySelector('.elements__title-text').textContent = this._text 
      return this._element
    }
}

 //Функция рендера карточек
function renderCards(items) {
  items.forEach ((item) => {
   const card = new Card (item.name, item.link)
   const cardElement = card.generateCard()
   //Выбираю контейнер карточек (куда вставлять)
   document.querySelector('.elements__list').append(cardElement)
 })}

renderCards(initialCards)




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
 