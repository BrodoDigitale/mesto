let profile = document.querySelector('.profile');
let edit = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

function editProfile() {
    popup.classList.add('popup_opened')
}

edit.addEventListener('click', editProfile);

let closeButton = popup.querySelector('.popup__close-button');

function closePopup() {
    popup.classList.remove('popup_opened');
};

closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.edit-form__name');
let jobInput = formElement.querySelector('.edit-form__about');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let name = nameInput.value;
    let about = jobInput.value;
    let profileName = profile.querySelector('.profile__name');
    let profileAbout = profile.querySelector('.profile__about');
    profileName.textContent = name;
    profileAbout.textContent = about;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 