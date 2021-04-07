
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
const popupProfileEditInputs = Array.from(profileForm.querySelectorAll('.edit-form__input'));
const popupProfileEditButton = popupProfileEdit.querySelector('.edit-form__button');
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
const openPopup = popup => {
    popup.classList.add('popup_opened');
//добавляем возможность закрытия через ESC
    document.addEventListener('keydown', escClosure);
};

//Функция очищения инпутов от ошибок
const clearErrors = form => {
  const inputs = form.querySelectorAll('.edit-form__input');
  inputs.forEach (input => {
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
    const popupToClose = evt.target;
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
  const form = popupProfileEdit.querySelector ('.edit-form');
  clearErrors(form);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  toggleButtonState(popupProfileEditButton, popupProfileEditInputs, validationConfig);
});
// Сохранение новых данных из  формы профиля
profileForm.addEventListener ('submit', evt => {
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfileEdit);
});

//Д О Б А В Л Е Н И Е  Ф О Т О 
addButton.addEventListener('click', () => {
    openPopup(popupNewCard)
    const form = popupNewCard.querySelector('.edit-form');
    clearErrors(form)
    placePhotoInput.value = ''
    placeInput.value = ''
    toggleButtonState(popupNewCardButton, popupNewCardInputs, validationConfig)
});


  //Добавление новой карточки

  formNewCard.addEventListener ('submit', evt => {
    const card = new Card (placeInput.value, placePhotoInput.value)
    const cardElement = card.generateCard()
    document.querySelector('.elements__list').prepend(cardElement)
    closePopup(popupNewCard);
  }); 
//Импорт
import {Card} from '../scripts/Card.js'
import {enableValidation, setEventListeners, toggleButtonState, hasInvalidInput, isValid, hideInputError, showInputError, validationConfig} from '../scripts/FormValidator.js'