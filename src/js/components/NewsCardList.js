import createElem from "../utils/createElem";
import NewsCard from "./NewsCard";
import errorImg from "../../images/not-found.svg";
import clearElem from "../utils/clearElem";

const createCard = (keyword, data, userArticles) => {
  const card = new NewsCard(keyword, data, userArticles);
  return card;
};

class NewsCardList {
  constructor() {
    this.createCardAreaResults = this.createCardAreaResults.bind(this);
    this.renderLoader = this.renderLoader.bind(this);
    this.cardList = [];
    this.cardUpdate = [];
    this.data = 0;
    this.userArticles = 0;
    this.key = 0;
    this.cardArea = document.querySelector(".card-area");
    this.cardArea.classList.add("card-area_result");
    this.cardContainer = createElem("div", "card-area__card-container");
    clearElem(this.cardArea);
    this.oldCount = 0;
    this.newCount = 3;
    this.button = "";
  }

  renderLoader() {
    clearElem(this.cardArea);

    const loader = createElem("i", "circle-preloader");
    const loaderDescription = createElem(
      "p",
      "card-area__search-message",
      "Идет поиск новостей..."
    );
    this.cardArea.append(loader);
    this.cardArea.append(loaderDescription);
  }

  renderError() {
    clearElem(this.cardArea);
    const img = createElem("img", "card-area__not-found-img");
    img.src = errorImg;
    const title = createElem(
      "p",
      "card-area__not-found-title",
      "Ничего не найдено"
    );
    const message = createElem(
      "p",
      "card-area__not-found-message",
      "К сожалению по вашему запросу ничего не найдено."
    );
    this.cardArea.append(img);
    this.cardArea.append(title);
    this.cardArea.append(message);
  }

  _addCard(keyword, card, userArticles) {
    const cardElem = createCard(keyword, card, userArticles);
    this.cardList.push(cardElem);
    this.cardUpdate.push(cardElem.renderIcon);
  }

  setCardsUpdate() {
    this.cardUpdate.forEach(elem => {
      elem();
    });
  }

  setCardsToList(data, key, userArticles) {
    this.dataLength = data.length;
    if (!this.data) {
      this.data = data;
    }
    if (!this.userArticles) {
      this.userArticles = userArticles;
    }

    if (key) {
      this.key = key;
      Object.keys(this.data).forEach(elem => {
        if (elem >= this.oldCount && elem < this.newCount) {
          this._addCard(key, this.data[elem], userArticles);
        }
      });
    } else {
      Object.keys(this.data).forEach(elem => {
        if (elem >= this.oldCount && elem < this.newCount) {
          this._addCard(this.data[elem].keyword, this.data[elem], userArticles);
        }
      });
    }
  }

  renderResults() {
    const renderCards = this.cardList.slice(this.oldCount, this.newCount);
    renderCards.forEach(card => {
      this.cardContainer.append(card);
    });
  }

  showMore() {
    this.oldCount = this.newCount;
    this.newCount = this.oldCount + 3;
    if (this.key) {
      this.setCardsToList(this.data, this.key, this.userArticles);
    } else {
      this.setCardsToList(this.data);
    }

    this.renderResults();

    if (!(this.data.length > 3) || !(this.newCount < this.data.length)) {
      this.button.remove();
    }
  }

  createCardAreaResults() {
    clearElem(this.cardArea);

    const contant = createElem("div", "card-area__contant");
    const title = createElem("h2", "card-area__title", "Результаты поиска");
    this.button = createElem("button", "card-area__btn", "Показать еще");

    this.button.addEventListener("click", this.showMore.bind(this));

    contant.append(title);
    contant.append(this.cardContainer);
    if (this.data.length > 3 || this.newCount < this.data.length) {
      contant.append(this.button);
    }

    this.cardArea.append(contant);
  }
}

export default NewsCardList;
