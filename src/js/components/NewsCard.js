import createElem from "../utils/createElem";
import MainApi from "../api/MainApi";

const apiClass = new MainApi();

class NewsCard {
  constructor(keyword, data) {
    this.data = data;
    this.keyword = keyword;
    this.card = createElem("div", "card-area__card");

    this.datePublished = this.data.publishedAt;
    if (this.datePublished.includes("T")) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      const dateSecond = new Date(Date.parse(this.data.publishedAt));
      const dateSplit = dateSecond.toLocaleString("ru", options).split(" ");
      this.datePublished = `${dateSplit[0]} ${dateSplit[1]}, ${dateSplit[2]}`;
    }

    this.cardHead = createElem("div", "card-area__card-head");
    this.cardButton = createElem("div", "card-area__card-button");
    this.savedCard = false;
    this.idCard = null;
    this._setCard();
    this.card.renderIcon = this.renderIcon.bind(this);
    return this.card;
  }

  renderIcon() {
    if (this.cardHead) {
      if (this.data.owner) {
        const cardCat = createElem("div", "card-area__card-cat", this.keyword);
        const deleteMessage = createElem(
          "div",
          "card-area__delete-message",
          "Убрать из сохранённых"
        );
        const trashIcon = createElem("div", "card-area__trash");
        this.cardButton.innerHTML = "";
        this.cardButton.append(deleteMessage);
        this.cardButton.append(trashIcon);
        this.cardHead.innerHTML = "";
        this.cardHead.append(cardCat);
        this.cardHead.append(this.cardButton);
      } else if (localStorage.getItem("token")) {
        this.cardButton.innerHTML = "";
        const icon = createElem("div", "card-area__bookmark");
        icon.addEventListener("click", this._clickHandler.bind(this));
        this.cardButton.append(icon);
        this.cardHead.append(this.cardButton);
      } else {
        this.cardButton.innerHTML = "";
        const message = createElem(
          "div",
          "card-area__auth-message",
          "Войдите, чтобы сохранять статьи"
        );
        const icon = createElem("div", "card-area__bookmark");
        this.cardButton.append(message);
        this.cardButton.append(icon);
        this.cardHead.append(this.cardButton);
      }
    }
  }

  _clickHandler() {
    if (this.savedCard) {
      apiClass.removeArticle(this.idCard).then(date => {
        this.savedCard = false;
        this.idCard = null;
        this.cardButton.children[0].classList.remove(
          "card-area__bookmark_active"
        );
      });
    } else {
      apiClass
        .createArticle(
          this.keyword,
          this.data.title,
          this.data.description,
          this.datePublished,
          this.data.source,
          this.data.url,
          this.data.urlToImage
        )
        .then(data => {
          this.savedCard = true;
          this.idCard = data.data._id;
          this.cardButton.children[0].classList.add(
            "card-area__bookmark_active"
          );
        })
        .catch(err => console.log("addArticleError: ", err));
    }
  }

  _setCard() {
    const img = createElem("img", "card-area__card-img");
    img.src = this.data.urlToImage;
    img.alt = "изображение карточки";
    this.card.append(img);
    this.renderIcon();
    this.card.append(this.cardHead);
    this._setDescription();
  }

  _setDescription() {
    const descriptionContainer = createElem(
      "div",
      "card-area__card-description-container"
    );
    const date = createElem("p", "card-area__card-date", this.datePublished);
    const name = createElem("p", "card-area__card-name", this.data.title);
    const text = createElem("p", "card-area__card-text", this.data.description);
    const sourse = createElem(
      "p",
      "card-area__card-sourse",
      this.data.source.name
    );

    descriptionContainer.append(date);
    descriptionContainer.append(name);
    descriptionContainer.append(text);
    descriptionContainer.append(sourse);

    this.card.append(descriptionContainer);
  }
}

export default NewsCard;
