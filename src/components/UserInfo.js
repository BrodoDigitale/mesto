export class UserInfo {
    constructor( { nameSelector, infoSelector, avatarSelector } ) {
        this._nameSelector = document.querySelector(nameSelector)
        this._infoSelector = document.querySelector(infoSelector)
        this._avatar = document.querySelector(avatarSelector)
    }
    getUserInfo() {
        return  { 
        name: this._nameSelector.textContent, 
        info: this._infoSelector.textContent
    }

    }
    setUserInfo(userData) {
            this._nameSelector.textContent = userData.name
            this._infoSelector.textContent = userData.about
            this._avatar.src = userData.avatar        
    }
}