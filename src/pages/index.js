//Импорт
import '../pages/index.css'
import {Api} from '../components/api.js'
import { editButton, addButton, avatarButton, profileName, profileAbout, validationConfig } from '../utils/constants.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupDelete } from '../components/PopupDelete'

//СОзДАНИЕ КЛАССОВ
//Создание api
const mestoApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
      "authorization": "ff36f33a-78de-4788-b2e8-96f517dc0490",
      "Content-Type": "application/json"
  }
})

//Создание попапа подтверждения удаления
const delPopup = new PopupDelete ({
  popupSelector: '.popup_confirmation',
  formSubmitHandler: (card) => {
      mestoApi.deleteCard(card._id).then(() => {
      card.deleteCard()
    })
      delPopup.close()
  }
})
delPopup.setEventListeners()

//Создание попапа для создания карточек
const popupNewCard = new PopupWithForm ({
  popupSelector: '.popup_addCard',
  formSubmitHandler: (inputsData) => {
    popupNewCard.renderLoading(true)
    mestoApi.addCard(inputsData)
    .then((res) => {
        const newCard = cardGenerator(res, myId, '.template') 
        cardList.addItem(newCard)
      })
      .catch(err => console.log(err))
      .finally(() => {
      popupNewCard.renderLoading(false)
    })
    popupNewCard.close()
  }
})
popupNewCard.setEventListeners()

//Вызов попапа с формой для добавления карточки
addButton.addEventListener('click', () => {
  popupNewCard.open()
  enableValidation(validationConfig, '.edit-form_addCard')
})

// Класс юзера
const userInfo = new UserInfo ({ 
  nameSelector: '.profile__name',  
  infoSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
}) 

// Создание попапа для смены аватра
const popupUpdateAvatar = new PopupWithForm ({ 
  popupSelector: '.popup_updateAvatar',
  formSubmitHandler: (inputValues) => {
    popupUpdateAvatar.renderLoading(true)
    mestoApi.updateAvatar(inputValues.link)
    .then((res) => {
      userInfo.setAvatar(res) 
    })
    .catch(err => console.log(err))
    .finally(() => {
    popupUpdateAvatar.renderLoading(false)
    })
    popupUpdateAvatar.close()
  }
 })
 popupUpdateAvatar.setEventListeners()

 //Вызов попапа редактирования аватара
avatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open()
  enableValidation(validationConfig, '.edit-form_updateAvatar')
})

//Создание попапа для редактирвоания профиля
const popupProfile = new PopupWithForm ({ 
  popupSelector: '.popup_editForm',
  formSubmitHandler: (inputValues) => {
    popupProfile.renderLoading(true)
    mestoApi.updateUserData(inputValues)
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .catch(err => console.log(err))
    .finally(() => {
    popupProfile.renderLoading(false)
    })
    popupProfile.close() 
  }
 })
 popupProfile.setEventListeners()

// Функция вызова попапа редактирования профиля

  editButton.addEventListener('click', () => {
     popupProfile.open()
     const actualInfo = userInfo.getUserInfo()
     profileName.value = actualInfo.name
     profileAbout.value = actualInfo.info
     enableValidation(validationConfig, '.edit-form_profile')
    })
  

//КЛАСС ВАЛИДАЦИИ
function enableValidation(config, selector) {
  const validator = new FormValidator(config, selector)
  validator.enableValidation()
  validator.clearErrors()
  validator.toggleButtonState()
}

//КОНТЕЙНЕР КАРТОЧЕК
 
const cardList = new Section ({
  renderer: (cardItem) => {
    const cardElement = cardGenerator (cardItem, myId, '.template')
    cardList.addItem(cardElement)
  }
},
'.elements__list', mestoApi
)

//Функция рендера карточки 

function cardGenerator(cardData,id, selector) {
  const card = new Card({
      data: cardData, 
      userId: id,
      cardSelector: selector,
      handleCardClick: () => {
        const popupPreview = new PopupWithImage ({ 
          popupSelector: '.popup_show-image', 
          data: cardData
        })
        popupPreview.open()
        popupPreview.setEventListeners()
    },
      handlelikeClick: (cardData, cardId) => {
        const isLiked = card.isLiked()
      if(isLiked){
        mestoApi.deleteLike(cardId)
        .then((res) => {
          cardData.updateLikes(res.likes.length)
        })
        .catch(err => console.log(err));
      } else {
        mestoApi.putLike(cardId)
        .then((res) => {
          cardData.updateLikes(res.likes.length)
        })
        .catch(err => console.log(err));
      }

    },
      handleDeleteClick: () => {
         delPopup.open()
         delPopup.setCard(card)
    },
})
    return card.generateCard();
  }
//переменная для записи айди
let myId = null

//РЕНДЕР С API
Promise.all([mestoApi.getInitialCards(), mestoApi.getUserData()])
  .then(([cardData, userData]) => {
    myId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderCards(cardData);
})
  .catch(err => console.log(err));
    

