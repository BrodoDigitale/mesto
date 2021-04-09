//Импорт
import {Card} from '../scripts/Card.js'
import { initialCards } from "./Initial-cards.js"
import {FormValidator} from '../scripts/FormValidator.js'
import {validationConfig} from '../scripts/FormValidator.js'
import { openPopup } from './Utils.js'
import { closePopup } from './Utils.js'

//ПЕРЕМЕННЫЕ
//Секция профиль
const profile = document.querySelector('.profile')
const editButton = profile.querySelector('.profile__edit-button')
const profileName = profile.querySelector('.profile__name')
const profileAbout = profile.querySelector('.profile__about')
const addButton = profile.querySelector('.profile__add-button')
//Попап редактирования профиля
const popupProfileEdit = document.querySelector('.popups .popup_editForm')
const profileForm = document.querySelector('.edit-form_profile')
const nameInput = profileForm.querySelector('.edit-form__input_value_name')
const jobInput = profileForm.querySelector('.edit-form__input_value_about')
const popupProfileEditInputs = Array.from(profileForm.querySelectorAll('.edit-form__input'))
const popupProfileEditButton = popupProfileEdit.querySelector('.edit-form__button')
//Попап добавление карточки
const popupNewCard = document.querySelector('.popups .popup_addCard')
const formNewCard = document.querySelector('.edit-form_addCard')
const placeInput = formNewCard.querySelector('.edit-form__input_value_place')
const placePhotoInput = formNewCard.querySelector('.edit-form__input_value_placePhoto')
const popupNewCardInputs = Array.from(formNewCard.querySelectorAll('.edit-form__input'))
const popupNewCardButton = formNewCard.querySelector('.edit-form__button')

//Р А Б О Т А  С  К А Р Т О Ч К А М И
//Функция рендера карточек
 function renderCards(items) {
  items.forEach ((item) => {
   const card = new Card (item.name, item.link, openPopup)
   const cardElement = card.generateCard()
   //Выбираю контейнер карточек (куда вставлять)
   document.querySelector('.elements__list').append(cardElement)
 })}
//Рендер изначальных карточек
renderCards(initialCards)

//Добавление карточки через попап 
//Открытие попапа для добавления карточки
addButton.addEventListener('click', () => {
  openPopup(popupNewCard)
  const form = popupNewCard.querySelector('.edit-form')
  clearErrors(form)
  placePhotoInput.value = ''
  placeInput.value = ''
  formValidator.toggleButtonState(popupNewCardButton, popupNewCardInputs, validationConfig)
})
//Добавление карточки на страницу 
  formNewCard.addEventListener ('submit', evt => {
    const card = new Card (placeInput.value, placePhotoInput.value)
    const cardElement = card.generateCard()
    document.querySelector('.elements__list').prepend(cardElement)
    closePopup(popupNewCard)
  })

//Р Е Д А К Т И Р О В А Н И Е  П Р О Ф И Л Я
// Открытие попапа редактировать профиль 
editButton.addEventListener('click', () => {
  openPopup(popupProfileEdit)
  const form = popupProfileEdit.querySelector ('.edit-form');
  clearErrors(form)
  nameInput.value = profileName.textContent
  jobInput.value = profileAbout.textContent
  formValidator.toggleButtonState(popupProfileEditButton, popupProfileEditInputs, validationConfig)
})
// Сохранение новых данных из  формы профиля
profileForm.addEventListener ('submit', evt => {
    profileName.textContent = nameInput.value
    profileAbout.textContent = jobInput.value
    closePopup(popupProfileEdit)
});

//В А Л И Д А Ц И Я  Ф О Р М
  const formValidator = new FormValidator(validationConfig)
  formValidator.enableValidation(validationConfig)

//Функция очищения инпутов от ошибок
const clearErrors = form => {
  const inputs = form.querySelectorAll('.edit-form__input')
  inputs.forEach (input => {
  formValidator.hideInputError(validationConfig,input, form)
})};