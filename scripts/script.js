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
const placeInput = formNewCard.querySelector('.edit-form__input_value_place');
const placePhotoInput = formNewCard.querySelector('.edit-form__input_value_placePhoto');
const popupNewCardInputs = Array.from(formNewCard.querySelectorAll('.edit-form__input'));
const popupNewCardButton = formNewCard.querySelector('.edit-form__button');
//Попап показ фото
const popupShowImg = document.querySelector('.popups .popup_show-image');
const popupShowImgPicture = document.querySelector('.popup__img');
const popupShowImgTitle = document.querySelector('.popup__title');

// О Т К Р Ы Т И Е  И  З А К Р Ы Т И Е  П О П - А П О В
//Функция открытия поп-апов
function openPopup(popup) {
    popup.classList.add('popup_opened');
//добавляем возможность закрытия через ESC
    document.addEventListener('keydown', escClosure);
};

//Функция очищения инпутов от ошибок
function clearErrors(popup) {
  form = popup.querySelector('.edit-form');
  input = form.querySelectorAll('.edit-form__input');
  input.forEach (function(input) {
  hideInputError(validationConfig,input, form);
})};

//Функция закрытия поп-апов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
//убираем возможность закрытия через ESC
  document.removeEventListener('keydown', escClosure);
}

//Выбираю все кнопки закрыть
const closeButtons = document.querySelectorAll('.popup__close-button');
//Добавляю слушателя для закрытия по клику на крестик
closeButtons.forEach (function (item) {
  item.addEventListener('click', evt => {
  const popupToClose = evt.target.closest('.popup_opened');
  closePopup(popupToClose);
    });
});

//Добавляю слушателя для закрытия по клику на любое свободное место попапов
const popups = document.querySelectorAll('.popup');
popups.forEach (function (item) {
  item.addEventListener('click', evt => {
    popupToClose = evt.target;
    if(popupToClose.classList.contains('popup_opened')) {
      closePopup(popupToClose);
    }
    evt.stopPropagation();
    })
  });
  //Функция закрытия попапа через ESC
  function escClosure(evt) {
    if(evt.key === 'Escape'){
      popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
  };

//Закрытие поп-апа вариант 2 (добавить модификатор каждой кнопке"закрыть" и повесить слушателя на него)
/*
closeButtonEditform.addEventListener('click', () => closePopup(popupProfileEdit));
closeButtonAddcard.addEventListener('click', () => closePopup(popupNewCard));
closeButtonShowImgPopup.addEventListener('click', () => closePopup(popupShowImg));*/


//Р Е Д А К Т И Р О В А Н И Е  П Р О Ф И Л Я
// слушатель для кнопки редактировать профиль 
editButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  clearErrors(popupProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
});
// Сохранение новых данных из  формы профиля
profileForm.addEventListener ('submit', evt => {
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfileEdit);
});

//Д О Б А В Л Е Н И Е  Ф О Т О
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
    clearErrors(popupNewCard);
    placePhotoInput.value = '';
    placeInput.value = '';
    toggleButtonState(popupNewCardButton, popupNewCardInputs, validationConfig);
});

//Р А Б О Т А  С  К А Р Т О Ч К А М И
  //Функция создания карточки + в сразу навешивание на нее слушателей 
  //Выбираю темплейт (что вставлять)
    const cardTemplate = document.querySelector('.template').content;
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
  
  //Вставка новых карточек
  //Выбираю контейнер карточек (куда вставлять)
   const cards = document.querySelector('.elements__list');
  //Функция рендера карточек
  function renderCards() {
    const result = initialCards.map(function(item) {
        return createCard(item);
    });
    cards.append(...result)
  }
    renderCards();

  //Добавление новой карточки
  formNewCard.addEventListener ('submit', evt => {
    const cardTitle = placeInput.value;
    const cardPhoto = placePhotoInput.value;
    const newCard = createCard({name: cardTitle, link: cardPhoto});
    cards.prepend(newCard);
    closePopup(popupNewCard);
  });
