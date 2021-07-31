export class Api {
    constructor(config) {
      // тело конструктора
      this._url = config.url;
      this._headers = config.headers
    }
  
    getInitialCards() {
        return fetch(this._url,{
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return res.json();
        })
     }
     getUserData() {
        return fetch(this._url,{
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            return res.json();
        })
        //return Promise.reject()(....)
     }
     addCard(data) {
       return fetch( this._url, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
         name: data.name,
         link: data.link
         })
       }).then((res) => {
        return res.json();
    })
    //return Promise.reject()(....)
     }
    // другие методы работы с API
  }
  
  /*const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
      'Content-Type': 'application/json'
    }
  }); 
  
+получить список всех карточек в виде массива (GET)
добавить карточку (POST)
удалить карточку (DELETE)
+получить данные пользователя (GET)
заменить данные пользователя (PATCH)
заменить аватар (PATCH)
“залайкать” карточку (PUT)
удалить лайк карточки (DELETE)
  
  */