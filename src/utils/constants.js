

//Секция редактирования профиля
// Кнопка открытия попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button')

// Инпуты 
const profileName = document.querySelector('.edit-form__input_value_name')
const profileAbout = document.querySelector('.edit-form__input_value_about')

//Кнопка добавление карточки
const addButton = document.querySelector('.profile__add-button')
//Кнопка аватара
const avatarButton = document.querySelector('.profile__avatar-button')

//Объект валидации
const validationConfig = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__button",
    inactiveButtonClass: "edit-form__button_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: ".edit-form__error"
  }
  export { editButton, addButton, avatarButton, profileName, profileAbout, validationConfig }