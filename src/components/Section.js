export class Section {
    constructor( {renderer}, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }
//метод для отрисовки всех элементов
    renderCards(data) {
        data.forEach ((item) => {
            this._renderer(item)
       })
    }
// добавляет DOM элемент в контейнер
    addItem(element) {
            this._container.prepend(element)
        }
}