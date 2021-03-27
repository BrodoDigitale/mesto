// В А Л И Д А Ц И Я  Ф О Р М 
//Выбор объекта
const object = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__button",
    inactiveButtonClass: "edit-form__button_disabled",
    inputErrorClass: "edit-form__input_type_error",
    errorClass: ".edit-form__error_visible"
  }
  
  //Функция включения ошибки
  function showInputError (obj, input, form) {
    const errorPlace = form.querySelector(`#${input.name}-error`);
    errorPlace.textContent = input.validationMessage;
    errorPlace.classList.add(obj.errorClass);
    input.classList.add(obj.inputErrorClass);
  }
  //Функция скрытия ошибки
  function hideInputError (obj, input, form) {
    input.classList.remove(obj.inputErrorClass);
    const errorPlace = form.querySelector(`#${input.name}-error`);
    errorPlace.textContent = '';
    errorPlace.classList.remove(obj.errorClass);
  }
  //Функция валидации формы
  const isValid = (obj, input, form) => {
    if(input.validity.valid) {
      hideInputError(obj,input, form);
    } else {
      showInputError(obj, input, form);
    }
  }
  //Проверка есть ли хоть одно невалидное поле
  const hasInvalidInput = (inputs) => {
    return inputs.some(input => {
    return !input.validity.valid;
    })
  }
  //Отключение кнопки при невалидном инпуте
  const toggleButtonState = (button, inputs, obj) => {
    if (hasInvalidInput(inputs)) {
      // кнопка неактивна
      button.classList.add(obj.inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      // кнопка активна
      button.classList.remove(obj.inactiveButtonClass);
      button.removeAttribute('disabled');
    };
  }; 
  // Добавление обработчиков инпутам
  function setEventListeners (obj, form) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.submitButtonSelector);
    inputs.forEach ((input) => {
      input.addEventListener('input', () => {
        isValid(obj, input, form);
        toggleButtonState(button, inputs, obj);
      });
    });
  };
  
  //Добавление обработчиков формам
  const enableValidation = (obj) => {
    const forms = Array.from(document.querySelectorAll(obj.formSelector));
    forms.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(obj, form);
    });
  }
  enableValidation(object);
  