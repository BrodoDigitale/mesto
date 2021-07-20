export class Section {
    constructor( {items, renderer}, containerSelector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }
//метод для отрисовки всех элементов
    renderCards() {
        this._items.forEach ((item) => {
            this._renderer(item)
       })
    }
// добавляет DOM элемент в контейнер
        addItem(element) {
            this._container.prepend(element)
        }
}