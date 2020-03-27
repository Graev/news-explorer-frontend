import "./pages/index.css";

import Header from "./js/components/Header";
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import NewsCardList from "./js/components/NewsCardList";
import mobileMenu from "./js/utils/mobileMenu";
import {
  Popup,
  RegistrPopup,
  LoginPopup,
  SuccessPopup
} from "./js/components/Popup";
import { RegisterForm, LoginForm } from "./js/components/Form";

const registrPopupElem = new RegistrPopup();
const loginPopupElem = new LoginPopup();
const successPopupElem = new SuccessPopup();

const registrFormElem = new RegisterForm();
const loginFormElem = new LoginForm();

const changeHeader = (isLoggedIn, userName, mainApi) => {
  const header = new Header(isLoggedIn, userName, mainApi);
};

export {
  registrPopupElem,
  loginPopupElem,
  successPopupElem,
  mainApiElem,
  registrFormElem,
  loginFormElem,
  changeHeader
};

mobileMenu();

const newsApiElem = new NewsApi();
// const popupClass = new Popup();

const mainApiElem = new MainApi();

if (localStorage.getItem("token")) {
  const userData = mainApiElem.getUserData();
  userData
    .then(data => {
      changeHeader(true, data.data.name, mainApiElem);
    })
    .catch(err => {
      console.log("err", err);
    });
} else {
  changeHeader(false, null, mainApiElem);
}

const searchBtn = document.querySelector(".search__btn");
const searchInput = document.querySelector(".search__input");

document.forms.search.addEventListener("submit", e => {
  e.preventDefault();
  if (searchInput.value != "") {
    searchBtn.classList.add("search__btn_deactiv");
    searchBtn.setAttribute("disabled", true);

    document.newsCardList = new NewsCardList();
    const keyword = searchInput.value;
    document.newsCardList.renderLoader();
    newsApiElem
      .getNews(keyword)
      .then(data => {
        data.key = keyword;

        if (data.status == "ok" && data.totalResults) {
          mainApiElem
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
            })
            .finally(() => {
              searchBtn.classList.remove("search__btn_deactiv");
              searchBtn.removeAttribute("disabled");
            });
        } else {
          document.newsCardList.renderError();
          searchBtn.classList.remove("search__btn_deactiv");
        }
      })
      .catch(err => {
        console.log("removeArticle ERROR :", err);
        document.newsCardList.renderError();
      });
  } else {
    searchInput.placeholder = "Пустое поле";
    searchInput.classList.add("search__input_error");

    searchInput.addEventListener("input", () => {
      searchInput.placeholder = "Введите тему новости";
      searchInput.classList.remove("search__input_error");
    });

    // setTimeout(() => {
    //   searchInput.placeholder = "Введите тему новости";
    //   searchInput.classList.remove("search__input_error");
    // }, 5000);
  }
});
