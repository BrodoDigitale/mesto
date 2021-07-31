//Импорт
import '../pages/index.css'
import {Api} from '../components/api.js'
import { editButton, addButton, profileName, profileAbout, validationConfig } from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'



//Создание карточки

function cardGenerator(cardData, selector) {
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
  
    //Функция рендера карточек с api
    const cardApi = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
      headers: {
        "authorization": "ff36f33a-78de-4788-b2e8-96f517dc0490",
        "Content-Type": "application/json"
      }
    })
    
    const cardList = new Section ({
      renderer: (cardItem) => {
        const cardElement = cardGenerator (cardItem, '.template')
        cardList.addItem(cardElement)
      }
    },
    '.elements__list', cardApi
    )
    cardApi.getInitialCards().then((res) =>{
      cardList.renderCards(res)
    })
    
//Загрузка информации о пользователе с сервера

const userInfo = new UserInfo ({ 
  nameSelector: '.profile__name',  
  infoSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
}) 

const userApi = new Api ({
  url: 'https://nomoreparties.co/v1/cohort-26/users/me ',
  headers: {
    "authorization": "ff36f33a-78de-4788-b2e8-96f517dc0490",
    "Content-Type": "application/json"
  }
})

userApi.getUserData().then((res) => {
  userInfo.setUserInfo(res)
})

//Создание попапа для создания карточек


const popupNewCard = new PopupWithForm ({
  popupSelector: '.popup_addCard',
  formSubmitHandler: (inputsData) => {
      cardList.saveItem(inputsData)
      popupNewCard.close()

    }
  }
)
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
 
