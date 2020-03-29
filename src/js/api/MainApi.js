class MainApi {
  constructor() {
    this._parametrsConnect = {
      baseUrl: "https://api.orevo.xyz",
      header: {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    };
  }

  _statusRequest(res) {
    // if (res.ok) {
    return res.json();
    // }
    // return Promise.reject(res);
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
    ).then(this._statusRequest);
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
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          this._parametrsConnect.header.headers[
            "authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          if (document.newsCardList) {
            document.newsCardList.setCardsUpdate();
          }
        }
        return data;
      });
  }

  logout() {
    return fetch(
      this._parametrsConnect.baseUrl + "/signin",
      Object.assign({ method: "DELETE" }, this._parametrsConnect.header)
    )
      .then(this._statusRequest)
      .then(() => {
        localStorage.removeItem("token");
        delete this._parametrsConnect.header.headers.authorization;
        if (document.newsCardList) {
          document.newsCardList.setCardsUpdate();
        }
      });
  }

  getUserData() {
    return fetch(
      this._parametrsConnect.baseUrl + "/users/me",
      Object.assign({}, this._parametrsConnect.header)
    ).then(this._statusRequest);
  }

  getArticles() {
    return fetch(
      this._parametrsConnect.baseUrl + "/articles",
      Object.assign({}, this._parametrsConnect.header)
    ).then(this._statusRequest);
  }

  createArticle(
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage
  ) {
    return fetch(
      this._parametrsConnect.baseUrl + "/articles",
      Object.assign({ method: "POST" }, this._parametrsConnect.header, {
        body: JSON.stringify({
          keyword,
          title,
          description,
          publishedAt,
          source,
          url,
          urlToImage
        })
      })
    ).then(this._statusRequest);
  }

  removeArticle(id) {
    return fetch(
      this._parametrsConnect.baseUrl + "/articles/" + id,
      Object.assign({ method: "DELETE" }, this._parametrsConnect.header)
    ).then(this._statusRequest);
  }
}

export default MainApi;
