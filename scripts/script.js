//Секция профиль
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const addButton = profile.querySelector('.profile__add-button');
//Попап редактирования профиля
const popupProfileEdit = document.querySelector('.popups .popup_editForm');
const profileForm = document.querySelector('.edit-form_profile');
const nameInput = profileForm.querySelector('.edit-form__input_value_name');
const jobInput = profileForm.querySelector('.edit-form__input_value_about');
//const closeButtonEditform = document.querySelector('.popups .popup__close-button_editForm');
//Попап добавить фото
const popupNewCard = document.querySelector('.popups .popup_addCard');
const formNewCard = document.querySelector('.edit-form_addCard');
//const closeButtonAddcard = document.querySelector('.popups .popup__close-button_addCard');
const placeInput = formNewCard.querySelector('.edit-form__input_value_place');
const placePhotoInput = formNewCard.querySelector('.edit-form__input_value_placePhoto');
//Попап показ фото
const popupShowImg = document.querySelector('.popups .popup_show-image');
const popupShowImgPicture = document.querySelector('.popup__img');
const popupShowImgTitle = document.querySelector('.popup__title');

// О Т К Р Ы Т И Е  И  З А К Р Ы Т И Е  П О П - А П О В
//Функция открытия поп-апов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//Закрытие поп-апопов 1 вариант 
//Выбираю все кнопки закрыть
const closeButton = document.querySelectorAll('.popup__close-button');
//Закрытие по клику на эти кнопки
closeButton.forEach (function (item) {
  item.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.parentElement.parentElement.classList.remove('popup_opened');
})});
//Закрытие для форм через submit
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Закрытие по клику в любое свободное место попапов
const popup = document.querySelectorAll('.popup');
popup.forEach (function (item) {
  item.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.classList.remove('popup_opened');
    evt.stopPropagation();
})});

//Закрытие поп-апа вариант 2 (добавить модификатор каждой кнопке"закрыть" и повесить слушателя на него)
/*
closeButtonEditform.addEventListener('click', () => closePopup(popupProfileEdit));
closeButtonAddcard.addEventListener('click', () => closePopup(popupNewCard));
closeButtonShowImgPopup.addEventListener('click', () => closePopup(popupShowImg));*/

//Р Е Д А К Т И Р О В А Н И Е  П Р О Ф И Л Я
// слушатель для кнопки редактировать профиль 
editButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
});
// Сохранение новых данных из  формы профиля
profileForm.addEventListener ('submit', evt => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfileEdit);
});

//Д О Б А В Л Е Н И Е  Ф О Т О
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
    placePhotoInput.value = '';
    placeInput.value = '';
});

//Р А Б О Т А  С  К А Р Т О Ч К А М И
//Массив карточек:
const initialCards = [
  {
    name: 'Чердынь',
    link: '../images/Чердынь.jpg'
  },
  {
    name: 'Кунгур',
    link: '../images/Кунгур.jpg'
  },
  {
    name: 'Хохловка',
    link: '../images/Хохловка.jpg'
  },
  {
    name: 'Чусовая',
    link: '../images/Чусовая.jpg'
  },
  {
    name: 'Пермь',
    link: '../images/Пермь.jpg'
  },
  {
    name: 'Зюраткуль',
    link: '../images/Зюраткуль.jpg'
  }
]; 

  //Функция создания карточки + в сразу навешивание на нее слушателей 
  //Выбираю темплейт (что вставлять)
    const cardTemplate = document.querySelector('.template').content;
   function createCard(card) {
    //Клонирую темплейт
    const createdCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
    //определяю атрибуты элементов
    createdCard.querySelector('.elements__img').src = card.link;
    createdCard.querySelector('.elements__title-text').textContent = card.name;
    createdCard.querySelector('.elements__img').alt = card.name;
    //Навешиваю слушатель для лайка 
    createdCard.querySelector('.elements__like-icon').addEventListener('click', evt => {
      evt.target.classList.toggle('elements__like-icon_active');
    });
    //Навешиваю слушатель для иконки удаления
    createdCard.querySelector('.elements__delete-btn').addEventListener('click', evt => {
      evt.target.parentElement.remove();
    });
    //Навешиваю слушатель для вызова попапа через картинку
    createdCard.querySelector('.elements__img').addEventListener('click', () => {
      openPopup(popupShowImg);
      popupShowImgPicture.src = card.link;
      popupShowImgTitle.textContent = card.name;
    });
    return createdCard;
   }
  
  //Вставка новых карточек
  //Выбираю контейнер карточек (куда вставлять)
   const cards = document.querySelector('.elements__list');
  //Функция рендера карточек
  function renderCards() {
    const result = initialCards.map(function(item) {
        createNewCard = createCard(item);
        return createNewCard;
    });
    cards.append(...result)
  }
    renderCards();

  //Добавление новой карточки
  formNewCard.addEventListener ('submit', evt => {
    evt.preventDefault();
    const cardTitle = placeInput.value;
    const cardPhoto = placePhotoInput.value;
    const newCard = createCard({name: cardTitle, link: cardPhoto});
    cards.prepend(newCard);
    closePopup(popupNewCard);
  });

  

  


