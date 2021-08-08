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
      mestoApi.deleteCard(card._id)
      .then(() => {
      card.deleteCard()
      delPopup.close()
    })
      .catch(err => console.log(err))
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
        popupNewCard.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
      popupNewCard.renderLoading(false)
    })
  }
})
popupNewCard.setEventListeners()
const popupNewCardValidator = new FormValidator(validationConfig, '.edit-form_addCard')
popupNewCardValidator.enableValidation()

//Вызов попапа с формой для добавления карточки
addButton.addEventListener('click', () => {
  popupNewCard.open()
  popupNewCardValidator.clearErrors()
  popupNewCardValidator.toggleButtonState()
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
      popupUpdateAvatar.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
    popupUpdateAvatar.renderLoading(false)
    })
  }
 })
 popupUpdateAvatar.setEventListeners()
 const popupUpdateAvatarValidator = new FormValidator(validationConfig, '.popup_updateAvatar')
 popupUpdateAvatarValidator.enableValidation()

 //Вызов попапа редактирования аватара
avatarButton.addEventListener('click', () => {
  popupUpdateAvatar.open()
  popupUpdateAvatarValidator.clearErrors()
  popupUpdateAvatarValidator.toggleButtonState()
})

//Создание попапа для редактирвоания профиля
const popupProfile = new PopupWithForm ({ 
  popupSelector: '.popup_editForm',
  formSubmitHandler: (inputValues) => {
    popupProfile.renderLoading(true)
    mestoApi.updateUserData(inputValues)
    .then((res) => {
      userInfo.setUserInfo(res)
      popupProfile.close() 
    })
    .catch(err => console.log(err))
    .finally(() => {
    popupProfile.renderLoading(false)
    })
  }
 })
 popupProfile.setEventListeners()
 const popupProfileValidator = new FormValidator(validationConfig, '.popup_editForm')
 popupProfileValidator.enableValidation()

// Функция вызова попапа редактирования профиля

  editButton.addEventListener('click', () => {
     popupProfile.open()
     popupProfileValidator.clearErrors()
     popupProfileValidator.toggleButtonState()
     const actualInfo = userInfo.getUserInfo()
     profileName.value = actualInfo.name
     profileAbout.value = actualInfo.info
    })
  
//Создание попапа увеличениия картинки карточки
const popupPreview = new PopupWithImage ('.popup_show-image')

popupPreview.setEventListeners()

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
        popupPreview.open(cardData.link, cardData.name) 
    },
      handlelikeClick: (cardData, cardId) => {
      if(card.isLiked()){
        mestoApi.deleteLike(cardId)
        .then((res) => {
          cardData.updateLikes(res)
        })
        .catch(err => console.log(err));
      } else {
        mestoApi.putLike(cardId)
        .then((res) => {
          cardData.updateLikes(res)
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
    

