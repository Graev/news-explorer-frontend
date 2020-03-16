class NewsApi {
  constructor() {
    this.getNews = this.getNews.bind(this);
  }

  _statusRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getNews(word) {
    const date = new Date();
    const to = date.toISOString().split("T")[0];
    const fromDate = to.split("-");
    const from = new Date(fromDate[0], fromDate[1] - 1, fromDate[2] - 7)
      .toISOString()
      .split("T")[0];
    const url =
      "https://newsapi.org/v2/everything?" +
      `q=${word}&` +
      `from=${from}&` +
      `to=${to}&` +
      "language=ru&" +
      "sortBy=popularity&" +
      "pageSize=100&" +
      "apiKey=2c1b8731593245bca65b7da9859ad70d";

    const req = new Request(url);

    return fetch(req)
      .then(this._statusRequest)
      .catch(err => console.log("removeArticle ERROR :", err));
  }
}

export default NewsApi;
