//Импорт
import {Card} from '../scripts/Card.js'
import { initialCards } from "./Initial-cards.js"
import {FormValidator} from '../scripts/FormValidator.js'
import {validationConfig} from '../scripts/FormValidator.js'
import { openPopup } from './Utils.js'
import { closePopup } from './Utils.js'

//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
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
//Попап добавление карточки
const popupNewCard = document.querySelector('.popups .popup_addCard')
const formNewCard = document.querySelector('.edit-form_addCard')
const placeInput = formNewCard.querySelector('.edit-form__input_value_place')
const placePhotoInput = formNewCard.querySelector('.edit-form__input_value_placePhoto')

//Ф У Н К Ц И И 
//Функция рендера карточек
  function renderCards(items) {
    items.forEach ((item) => {
        const cardTemplate = '.template'
        const card = new Card (item, cardTemplate, openPopup)
        const cardElement = card.generateCard()
//Выбираю контейнер карточек (куда вставлять)
   document.querySelector('.elements__list').append(cardElement)
   })}

//Функция добавления карточки через попап 
  formNewCard.addEventListener ('submit', evt => {
    const cardTemplate = '.template'
    const newCard = {name: `${placeInput.value}`, link: `${placePhotoInput.value}`}
    const card = new Card (newCard, cardTemplate, openPopup)
    const cardElement = card.generateCard() 
    document.querySelector('.elements__list').prepend(cardElement)
    closePopup(popupNewCard)
  })

//О Б Р А Б О Т Ч И К И
//Обработчик для кнопки открытия попапа добавления карточки
  addButton.addEventListener('click', () => {
    openPopup(popupNewCard)
    const form = popupNewCard.querySelector('.edit-form')
    form.reset()
    formNewCardValidator.clearErrors()
    formNewCardValidator.toggleButtonState()
  })
// Обработчик для кнопки открытия попапа редактирования профиля
  editButton.addEventListener('click', () => {
    openPopup(popupProfileEdit)
    profileFormValidator.clearErrors()
    nameInput.value = profileName.textContent
    jobInput.value = profileAbout.textContent
    profileFormValidator.toggleButtonState()
  })
// Обработчик для кнопки сохранения новых данных из  формы редактирования профиля
  profileForm.addEventListener ('submit', evt => {
    profileName.textContent = nameInput.value
    profileAbout.textContent = jobInput.value
    closePopup(popupProfileEdit)
  })
//В А Л И Д А Ц И Я  Ф О Р М
  const profileFormValidator = new FormValidator(validationConfig, profileForm)
  profileFormValidator.enableValidation()
  const formNewCardValidator = new FormValidator(validationConfig, formNewCard)
  formNewCardValidator.enableValidation()

//Рендер изначальных карточек
  renderCards(initialCards)