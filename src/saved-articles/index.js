import "../pages/lk.css";
import Header from "../js/components/Header";
import MainApi from "../js/api/MainApi";
import NewsApi from "../js/api/NewsApi";
import NewsCardList from "../js/components/NewsCardList";
import createElem from "../js/utils/createElem";
import num2str from "../js/utils/num2str";
import sortKeyword from "../js/utils/sortKeyword";
import keywordsCreate from "../js/utils/keywordsCreate";

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
  location = "/index.html";
}

apiClass.getArticles().then(data => {
  const str = num2str(data.data.length, [
    "сохранённая статья",
    "сохранённые статьи",
    "сохранённых статей"
  ]);

  document.querySelector(".lk__title").textContent = `${
    document.querySelector("#auth-btn").textContent
  }, у вас ${data.data.length} ${str}`;

  keywordsCreate(data.data);

  document.newsCardList = new NewsCardList();
  document.newsCardList.renderLoader();

  if (data.data.length) {
    document.newsCardList.setCardsToList(data.data);
    document.newsCardList.renderResults();
    document.newsCardList.createCardAreaResults();
  } else {
    document.newsCardList.renderError();
  }

  //   <p class="lk__key-words">
  //     По ключевым словам: <b>Природа, Тайга</b> и <b>2 другим</b>
  //   </p>;
});
