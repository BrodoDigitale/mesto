let profile = document.querySelector('.profile');
let edit = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.edit-form__name');
let jobInput = formElement.querySelector('.edit-form__about');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');

//Функция открытия поп-апа
function editProfile() {
    popup.classList.add('popup_opened')
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

//Закрытие поп-апа
function closePopup() {
    popup.classList.remove('popup_opened');
};

//Заполнения полей формы
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup();
}
//слушатели событий
edit.addEventListener('click', editProfile);
formElement.addEventListener('submit', formSubmitHandler); 
closeButton.addEventListener('click', closePopup);