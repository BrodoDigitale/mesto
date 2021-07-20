import { UserInfo } from '../components/UserInfo.js'

//Секция редактирования профиля
// Кнопка открытия попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button')

// Инпуты 
const profileName = document.querySelector('.edit-form__input_value_name')
const profileAbout = document.querySelector('.edit-form__input_value_about')

//Класс с информацией о пользователе
const userInfo = new UserInfo ({ 
    nameSelector: '.profile__name',  
    infoSelector: '.profile__about',
  }) 

//Кнопка добавление карточки
const addButton = document.querySelector('.profile__add-button')


//Массив для отрисовки карточек:
const initialCards = [
    {
      name: 'Чусовая',
      link: 'https://i.postimg.cc/8Ppzn4PH/image.jpg'
    },
    {
      name: 'Пермь',
      link: 'https://i.postimg.cc/Pfzq49hJ/image.jpg'
    },
    {
      name: 'Зюраткуль',
      link: 'https://i.postimg.cc/nLyLRtCj/image.jpg'
    },
    {
        name: 'Чердынь',
        link: 'https://i.postimg.cc/ZncK5Bjp/image.jpg'
      },
      {
        name: 'Кунгур',
        link: 'https://i.postimg.cc/vB5ZCSVP/image.jpg'
      },
      {
        name: 'Хохловка',
        link: 'https://i.postimg.cc/rscwTCGq/image.jpg'
      },
  ]

//Объект валидации
const validationConfig = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__button",
    inactiveButtonClass: "edit-form__button_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: ".edit-form__error"
  }
  export { editButton, addButton, profileName, profileAbout, userInfo, initialCards, validationConfig }