export class Api {
    constructor(config) {
      // тело конструктора
      this._url = config.url;
      this._headers = config.headers
    }
  
    getInitialCards() {
        return fetch(`${this._url}/cards`,{
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse)
     }
     getUserData() {
        return fetch(`${this._url}/users/me`,{
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse)
     }
     updateUserData(data) {
      return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.userInfo,
        })
    })
    .then(this._handleResponse)
     }
     updateAvatar(newLink) {
      return fetch(`${this._url}/users/me/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newLink
        })
      })
      .then(this._handleResponse)
     }
     addCard(data) {
       return fetch( `${this._url}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
         name: data.name,
         link: data.link,
         })
       })
       .then(this._handleResponse)
     }
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`,{
        method: 'DELETE',
        headers: this._headers
    })
    .then(this._handleResponse)
    }
    _handleResponse(res) {
     if(res.ok) {
       return res.json()
     }
     return Promise.reject (`Ошибка: ${res.status}`)
    }
    putLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`,{
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleResponse)
    }
    deleteLike(id) {
      return fetch(`${this._url}/cards/likes/${id}`,{
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleResponse)
      }
  }
  