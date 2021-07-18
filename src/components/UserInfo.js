export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameSelector = document.querySelector(nameSelector)
        this._infoSelector = document.querySelector(infoSelector)
    }
    getUserInfo() {
        return  { 
        actualName: this._nameSelector.textContent, 
        actualInfo: this._infoSelector.textContent
    }

    }
    setUserInfo( newName, newInfo) {
            this._nameSelector.textContent = newName.value
            this._infoSelector.textContent = newInfo.value
    }
}