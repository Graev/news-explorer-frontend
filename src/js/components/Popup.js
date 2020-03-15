import Form from "./Form";
import createElem from "../utils/createElem";
import Header from "./Header";
import MainApi from "../api/MainApi";

const apiClass = new MainApi();

class Popup {
  constructor() {
    this.popupBlock = document.querySelector(".popup__block");
    this._setAuthPopup();
    this.open();
    document.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
  }

  _clearContentForm() {
    this.popupBlock.innerHTML = "";
  }

  _setAuthPopup() {
    this._clearContentForm();
    document.querySelector(".popup__title").textContent = "Вход";

    const form = new Form("auth");
    form.addEventListener("submit", event => {
      event.preventDefault();

      const formData = form.getInfo();
      apiClass
        .singin(formData.email, formData.password)
        .then(data => {
          if (data.name) {
            const headerClass = new Header(true, data.name);
            this.close();
          } else {
            throw data;
          }
        })
        .catch(err => {
          if (err.status === 500) {
            form.setServerError("Ошибка на сервере");
          } else {
            form.setServerError("Неправильный логин или пароль");
          }
        });
    });

    const p = createElem("p", "popup__link", "или ");
    const a = document.createElement("a");
    a.textContent = "Зарегистрироваться";
    a.addEventListener("click", event => {
      event.preventDefault();
      this._setRegistrPopup();
    });
    p.append(a);
    this.popupBlock.append(form);
    this.popupBlock.append(p);
  }

  _setRegistrPopup() {
    this._clearContentForm();
    document.querySelector(".popup__title").textContent = "Регистрация";

    const form = new Form("registr");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const formData = form.getInfo();
      apiClass
        .singup(formData.email, formData.password, formData.name)
        .then(data => {
          if (data.status != 201) {
            throw data;
          } else {
            this._setSuccessPopup();
          }
        })
        .catch(err => {
          if (err.status === 500) {
            form.setServerError("Ошибка на сервере");
          } else {
            form.setServerError(err.message);
          }
        });
    });

    const p = createElem("p", "popup__link", "или ");
    const a = document.createElement("a");
    a.textContent = "Войти";
    a.addEventListener("click", event => {
      event.preventDefault();
      this._setAuthPopup();
    });
    p.append(a);
    this.popupBlock.append(form);
    this.popupBlock.append(p);
  }

  _setSuccessPopup() {
    this._clearContentForm();
    document.querySelector(".popup__title").textContent =
      "Пользователь успешно зарегистрирован!";
    const a = document.createElement("a");
    a.classList.add("popup__enter");
    a.textContent = "Выполнить вход";
    a.addEventListener("click", event => {
      event.preventDefault();
      this._setAuthPopup();
    });
    this.popupBlock.append(a);
  }

  open() {
    document.querySelector(".overlay").classList.add("overlay_active");
    document.querySelector(".popup").classList.add("popup_active");
  }

  close() {
    document.querySelector(".overlay").classList.remove("overlay_active");
    document.querySelector(".popup").classList.remove("popup_active");
  }
}

export default Popup;
