export class UserInfo {
    constructor( { nameSelector, infoSelector, avatarSelector } ) {
        this._nameSelector = document.querySelector(nameSelector)
        this._infoSelector = document.querySelector(infoSelector)
        this._avatar = document.querySelector(avatarSelector)
        this.name = ''
        this.info = ''
    }
    getUserInfo() {
        return  { 
        name: this.name, 
        info: this.info
    }

    }
    setUserInfo(data) {
            this._nameSelector.textContent = data.name
            this._infoSelector.textContent = data.about
            this._avatar.src = data.avatar
    }
    updateUserInfo() {
        this._nameSelector.textContent = this.name
        this._infoSelector.textContent = this.info
    }
    setAvatar(data) {
        this._avatar.src = data.avatar
    }
}