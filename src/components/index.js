//Импорт
import '../pages/index.css'
import { editButton, addButton } from './Utils.js'
import {Card} from './Card.js'
import { initialCards } from "./Initial-cards.js"
import {FormValidator} from './FormValidator.js'
import {validationConfig} from './FormValidator.js'
import { Section } from './Section.js'
import { PopupWithForm } from './PopupWithForm.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { Popup } from './Popup'


//Ф У Н К Ц И И 
//Функция рендера карточек

  const cardList = new Section ({
    items: initialCards,
    renderer: (cardItem) => {
      const cardTemplate = '.template'
      const card = new Card ({
      data: cardItem, 
      cardSelector: cardTemplate,
      handleCardClick: () => {
        const ImagePopup = new PopupWithImage ({
          popupSelector: '.popup_show-image',
          data: cardItem
        })
        ImagePopup.open()
        ImagePopup.setEventListeners()
      } 
      })
      const cardElement = card.generateCard()
      cardList.addItem(cardElement)
      }
    },
  '.elements__list'
  )
  cardList.renderCards()
  
//Вызов попапа с формой для добавления карточки
addButton.addEventListener('click', () => {
  const popupNewCard = new PopupWithForm ({
    popupSelector: '.popups .popup_addCard',
    formSubmitHandler: () => {
      const cardTemplate = '.template'
      const inputValues = popupNewCard._getInputValues()
      const card = new Card ({
        data: inputValues, 
        cardSelector: cardTemplate,
        handleCardClick: () => {
          const ImagePopup = new PopupWithImage ({
            popupSelector: '.popup_show-image',
            data: inputValues
          })
          ImagePopup.open()
          ImagePopup.setEventListeners()
        }
      })
      const cardElement = card.generateCard() 
      document.querySelector('.elements__list').prepend(cardElement)
    }
  })
  popupNewCard.open()
  popupNewCard.setEventListeners()
  const formNewCard = document.querySelector('.edit-form_addCard')
  const formNewCardValidator = new FormValidator(validationConfig, formNewCard)
  formNewCardValidator.enableValidation()
  formNewCardValidator.clearErrors()
  formNewCardValidator.toggleButtonState()
})


// Вызов попапа редактирования профиля
  editButton.addEventListener('click', () => {
      const popupProfile = new Popup ({ 
      popupSelector: '.popup_editForm'
    })
    popupProfile.open()
    const profileForm = document.querySelector('.edit-form_profile')
    const profileFormValidator = new FormValidator(validationConfig, profileForm)
    profileFormValidator.enableValidation()
    profileFormValidator.clearErrors()
    popupProfile.setEventListeners()
    const userInfo = new UserInfo ({
      nameSelector: '.profile__name', 
      infoSelector: '.profile__about'
    })
    const actualInfo = userInfo.getUserInfo()
    const profileName = profileForm.querySelector('.edit-form__input_value_name')
    const profileAbout = profileForm.querySelector('.edit-form__input_value_about')
    profileName.value = actualInfo.actualName
    profileAbout.value = actualInfo.actualInfo
    profileFormValidator.toggleButtonState()
    profileForm.addEventListener ('submit', evt => {
      userInfo.setUserInfo(profileName, profileAbout)
      popupProfile.close()
    })
  })


  

