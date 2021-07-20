//Импорт
import '../pages/index.css'
import { editButton, addButton, profileName, profileAbout, userInfo, initialCards, validationConfig } from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'


//Создание карточки

function cardGenerator( cardData, selector) {
const card = new Card({
    data: cardData, 
    cardSelector: selector, 
    handleCardClick: () => {
      const popupPreview = new PopupWithImage ({ 
        popupSelector: '.popup_show-image', 
        data: cardData
      })
      popupPreview.open()
      popupPreview.setEventListeners()
  }    
})
  return card.generateCard();
}

//Функция рендера карточек

  const cardList = new Section ({
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = cardGenerator (cardItem, '.template')
      cardList.addItem(cardElement)
    }
  },
  '.elements__list'
  )
  cardList.renderCards()
  

//Создание попапа для создания карточек

const popupNewCard = new PopupWithForm ({
  popupSelector: '.popup_addCard',
  formSubmitHandler: (inputsData) => {
    const card = cardGenerator (inputsData, '.template')
    popupNewCard.close()
    cardList.addItem(card)
  }
})
popupNewCard.setEventListeners()

//Вызов попапа с формой для добавления карточки
addButton.addEventListener('click', () => {
  popupNewCard.open()
  enableValidation(validationConfig, '.edit-form_addCard')
})

//Создание попапа для редактирвоания профиля
const popupProfile = new PopupWithForm ({ 
  popupSelector: '.popup_editForm',
  formSubmitHandler: (inputValues) => {
    userInfo.setUserInfo(inputValues)
    popupProfile.close() 
  }
 })
 popupProfile.setEventListeners()

// Вызов попапа редактирования профиля

  editButton.addEventListener('click', () => {
     popupProfile.open()
     const actualInfo = userInfo.getUserInfo()
     profileName.value = actualInfo.name
     profileAbout.value = actualInfo.info
     enableValidation(validationConfig, '.edit-form_profile')
    })
  

    //Функция валидации
    function enableValidation(config, selector) {
      const validator = new FormValidator(config, selector)
      validator.enableValidation()
      validator.clearErrors()
      validator.toggleButtonState()
    }
 