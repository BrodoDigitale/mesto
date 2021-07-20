// В А Л И Д А Ц И Я  Ф О Р М 

//КЛАСС ВАЛИДАЦИИ
export class FormValidator {
  constructor(obj, formSelector) {
    this._obj = obj
    this._form = document.querySelector(formSelector)
    this._inputs = Array.from(this._form.querySelectorAll(this._obj.inputSelector))
    this._button = this._form.querySelector(this._obj.submitButtonSelector)
  }
//Функция валидации (обработчик формы)
  enableValidation(){
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })
      this._setEventListeners()
    }
//Добавление обработчиков для проверки валидности каждого инпута формы
  _setEventListeners(){ 
    this._inputs.forEach ((input) => {
      input.addEventListener('input', () => {
        this._isValid(input)
        this.toggleButtonState()
      })
    })
  }
//Отключение кнопки сабмита при наличии хотя бы 1 невалидного инпута
  toggleButtonState(){
    if (this._hasInvalidInput()) {
      // кнопка неактивна
      this._button.classList.add(this._obj.inactiveButtonClass)
      this._button.setAttribute('disabled', true)
    } else {
      // кнопка активна
      this._button.classList.remove(this._obj.inactiveButtonClass)
      this._button.removeAttribute('disabled')
    }
  }
//Проверка на валидность всех инпутов формы
  _hasInvalidInput(){
    return this._inputs.some(input => {
    return !input.validity.valid
    })
  }
//Проверка валидности инпута
  _isValid (input){
    if(input.validity.valid) {
      this.hideInputError(input)
    } else {
      this.showInputError(input)
    }
  }
//Функция показа ошибки
  hideInputError(input){
    input.classList.remove(this._obj.inputErrorClass)
    const errorPlace = this._form.querySelector(`#${input.id}-error`)
    errorPlace.textContent = ''
    errorPlace.classList.remove(this._obj.errorClass)
  }
//Функция скрытия ошибки
  showInputError(input){
    const errorPlace = this._form.querySelector(`#${input.id}-error`)
    errorPlace.textContent = input.validationMessage
    errorPlace.classList.add(this._obj.errorClass)
    input.classList.add(this._obj.inputErrorClass)
  }
//Функция очищения инпутов от ошибок
  clearErrors (){
    this._inputs.forEach (input => {
      this.hideInputError(input)}
    )}
  }

