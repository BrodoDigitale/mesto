export class Section {
    constructor( {renderer}, containerSelector, api) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
        this._api = api
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
    saveItem(data) {
        this._api
            .addCard(data)
            .then((res) => {
                const newCard = {link: res.link, name: res.name}
                this._renderer(newCard)}
            )}
}