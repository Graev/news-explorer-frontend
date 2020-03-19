import "./pages/index.css";

import Header from "./js/components/Header";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import NewsCardList from "./js/components/NewsCardList";
import mobileMenu from "./js/utils/mobileMenu";

mobileMenu();

const newsApiClass = new NewsApi();
// const popupClass = new Popup();

const apiClass = new MainApi();

if (localStorage.getItem("token")) {
  const userData = apiClass.getUserData();
  userData
    .then(data => {
      const headerClass = new Header(true, data.data.name);
    })
    .catch(err => {
      console.log("err", err);
    });
} else {
  const headerClass = new Header(false, null);
}

document.forms.search.addEventListener("submit", e => {
  e.preventDefault();
  document.newsCardList = new NewsCardList();
  const keyword = document.querySelector(".search__input").value;
  document.newsCardList.renderLoader();
  newsApiClass.getNews(keyword).then(data => {
    data.key = keyword;

    if (data.status == "ok" && data.totalResults) {
      apiClass
        .getArticles()
        .then(userArticles => {
          document.newsCardList.setCardsToList(
            data.articles,
            data.key,
            userArticles.data
          );
          document.newsCardList.renderResults();
          document.newsCardList.createCardAreaResults();
        })
        .catch(err => {
          console.log("err", err);
          document.newsCardList.renderError();
        });
    } else {
      document.newsCardList.renderError();
    }
  });
});
