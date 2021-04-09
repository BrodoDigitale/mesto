//КОНСТАНТЫ
//ОТКРЫТИЕ ПОПАПОВ

export const openPopup = popup => {
    popup.classList.add('popup_opened');
//добавляем возможность закрытия через ESC
    document.addEventListener('keydown', escClosure);
};

//ЗАКРЫТИЕ ПОПАПОВ

//Функция закрытия поп-апов
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
  //убираем возможность закрытия через ESC
    document.removeEventListener('keydown', escClosure);
  }
  
  //Выбираю все кнопки закрыть
  const closeButtons = document.querySelectorAll('.popup__close-button');
  //Добавляю слушателя для закрытия по клику на крестик
  closeButtons.forEach (function (item) {
    item.addEventListener('click', evt => {
    const popupToClose = evt.target.closest('.popup_opened');
    closePopup(popupToClose);
      });
  });
  
  //Добавляю слушателя для закрытия по клику на любое свободное место попапов
  const popups = document.querySelectorAll('.popup');
  popups.forEach (function (item) {
    item.addEventListener('click', evt => {
      const popupToClose = evt.target;
      if(popupToClose.classList.contains('popup_opened')) {
        closePopup(popupToClose);
      }
      evt.stopPropagation();
      })
    });
    //Функция закрытия попапа через ESC
    function escClosure(evt) {
      if(evt.key === 'Escape'){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
      }
    };