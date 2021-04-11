

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
export const openPopup = popup => {
    popup.classList.add('popup_opened')
//включение обработчика закрытия через ESC
    document.addEventListener('keydown', escClosure)
}

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
//отключение обработчика закрытия через ESC 
    document.removeEventListener('keydown', escClosure)
}
 
//Функция закрытия попапов по клику на крестик или любое свободное место попапов
const popups = document.querySelectorAll('.popup')

popups.forEach (function (item) {
    item.addEventListener('click', evt => {
      const popupToClose = document.querySelector('.popup_opened')
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popupToClose)
        }
      evt.stopPropagation()
      })
    })
//Функция закрытия попапа через ESC
function escClosure(evt) {
      if(evt.key === 'Escape'){
        const popup = document.querySelector('.popup_opened')
        closePopup(popup)
      }
    }