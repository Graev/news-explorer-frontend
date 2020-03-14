class MainApi {
  constructor() {
    console.log("object123");
    this._parametrsConnect = {
      baseUrl: "http://127.0.0.1:3005",
      header: {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    };
  }

  _statusRequest(res) {
    console.log("res.ok", res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  singup(email, password, name) {
    return fetch(
      this._parametrsConnect.baseUrl + "/signup",
      Object.assign({ method: "POST" }, this._parametrsConnect.header, {
        body: JSON.stringify({
          email,
          password,
          name
        })
      })
    )
      .then(this._statusRequest)
      .catch(err => {
        console.log("singup ERROR :", err);
        return err;
      });
  }

  singin(email, password) {
    return fetch(
      this._parametrsConnect.baseUrl + "/signin",
      Object.assign({ method: "POST" }, this._parametrsConnect.header, {
        body: JSON.stringify({
          email,
          password
        })
      })
    )
      .then(this._statusRequest)
      .catch(err => console.log("singin ERROR :", err));
  }

  logout() {
    return fetch(
      this._parametrsConnect.baseUrl + "/signin",
      Object.assign({ method: "DELETE" }, this._parametrsConnect.header)
    )
      .then(this._statusRequest)
      .catch(err => console.log("logout ERROR :", err));
  }

  getUserData() {
    return fetch(
      this._parametrsConnect.baseUrl + "/users/me",
      Object.assign({}, this._parametrsConnect.header)
    )
      .then(this._statusRequest)
      .catch(err => console.log("getUserData ERROR :", err));
  }

  getArticles() {
    return fetch(
      this._parametrsConnect.baseUrl + "/articles",
      Object.assign({}, this._parametrsConnect.header)
    )
      .then(this._statusRequest)
      .catch(err => console.log("getArticles ERROR :", err));
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(
      this._parametrsConnect.baseUrl + "/articles",
      Object.assign({ method: "POST" }, this._parametrsConnect.header, {
        body: JSON.stringify({
          keyword,
          title,
          text,
          date,
          source,
          link,
          image
        })
      })
    )
      .then(this._statusRequest)
      .catch(err => console.log("createArticle ERROR :", err));
  }

  removeArticle(id) {
    return fetch(
      this._parametrsConnect.baseUrl + "/articles/" + id,
      Object.assign({ method: "DELETE" }, this._parametrsConnect.header)
    )
      .then(this._statusRequest)
      .catch(err => console.log("removeArticle ERROR :", err));
  }
}

export default MainApi;
