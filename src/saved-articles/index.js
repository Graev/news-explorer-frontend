import "../pages/lk.css";
import Header from "../js/components/Header";
import MainApi from "../js/api/MainApi";
import NewsCardList from "../js/components/NewsCardList";
import num2str from "../js/utils/num2str";
import keywordsCreate from "../js/utils/keywordsCreate";
import mobileMenu from "../js/utils/mobileMenu";

mobileMenu();

const mainApiElem = new MainApi();

if (localStorage.getItem("token")) {
  const userData = mainApiElem.getUserData();
  userData
    .then(userData => {
      const headerClass = new Header(true, userData.data.name, mainApiElem);
      mainApiElem.getArticles().then(data => {
        const str = num2str(data.data.length, [
          "сохранённая статья",
          "сохранённые статьи",
          "сохранённых статей"
        ]);

        document.querySelector(
          ".lk__title"
        ).textContent = `${userData.data.name}, у вас ${data.data.length} ${str}`;

        keywordsCreate(data.data);

        document.newsCardList = new NewsCardList();
        document.newsCardList.renderLoader();

        if (data.data.length) {
          document.newsCardList.setCardsToList(
            data.data,
            null,
            null,
            mainApiElem
          );
          document.newsCardList.renderResults();
          document.newsCardList.createCardAreaResults();
        } else {
          document.newsCardList.renderError();
        }
      });
    })
    .catch(err => {
      console.log("err", err);
    });
} else {
  location = "/index.html";
}
