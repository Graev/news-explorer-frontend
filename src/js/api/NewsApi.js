class NewsApi {
  constructor() {}

  _statusRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getNews(word) {
    const date = new Date();
    const from = date.toISOString().split("T")[0];
    const toDate = from.split("-");
    const to = new Date(toDate[0], toDate[1], toDate[2] - 7)
      .toISOString()
      .split("T")[0];
    const url =
      "http://newsapi.org/v2/everything?" +
      `q=${word}&` +
      `from=${from}&` +
      `to=${to}&` +
      "country=ru&" +
      "sortBy=popularity&" +
      "pageSize=100&" +
      "apiKey=2c1b8731593245bca65b7da9859ad70d";
    const req = new Request(url);

    return fetch(req)
      .then(this._statusRequest)
      .catch(err => console.log("removeArticle ERROR :", err));
  }
}
