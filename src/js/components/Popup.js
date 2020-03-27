import createElem from "../utils/createElem";
import {
  registrPopupElem,
  loginPopupElem,
  successPopupElem,
  registrFormElem,
  loginFormElem,
  changeHeader,
  mainApiElem
} from "../../index.js";
import clearElem from "../utils/clearElem";

class Popup {
  constructor() {
    this.popupBlock = document.querySelector(".popup__block");
    this.overlayDOM = document.querySelector(".overlay");
    this.popupDOM = document.querySelector(".popup");
    document.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
    this.popupTitle = document.querySelector(".popup__title");
  }

  _clearContentForm() {
    clearElem(this.popupBlock);
  }

  // _setAuthPopup() {
  //   this._clearContentForm();
  //   document.querySelector(".popup__title").textContent = "Вход";

  //   const form = new Form("auth");
  //   form.addEventListener("submit", event => {
  //     event.preventDefault();

  //     const formData = form.getInfo();
  //     apiClass
  //       .singin(formData.email.toLowerCase(), formData.password)
  //       .then(data => {
  //         if (data.name) {
  //           const headerClass = new Header(true, data.name);
  //           this.close();
  //         } else {
  //           throw data;
  //         }
  //       })
  //       .catch(err => {
  //         if (err.status === 500) {
  //           form.setServerError("Ошибка на сервере");
  //         } else {
  //           form.setServerError("Неправильный логин или пароль");
  //         }
  //       });
  //   });

  //   const p = createElem("p", "popup__link", "или ");
  //   const a = document.createElement("a");
  //   a.textContent = "Зарегистрироваться";
  //   a.addEventListener("click", event => {
  //     event.preventDefault();
  //     this._setRegistrPopup();
  //   });
  //   p.append(a);
  //   this.popupBlock.append(form);
  //   this.popupBlock.append(p);
  // }

  // _setSuccessPopup() {
  //   this._clearContentForm();
  //   document.querySelector(".popup__title").textContent =
  //     "Пользователь успешно зарегистрирован!";
  //   const a = document.createElement("a");
  //   a.classList.add("popup__enter");
  //   a.textContent = "Выполнить вход";
  //   a.addEventListener("click", event => {
  //     event.preventDefault();
  //     this._setAuthPopup();
  //   });
  //   this.popupBlock.append(a);
  // }

  _escButtonHandler(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

  open() {
    this.overlayDOM.classList.add("overlay_active");
    this.popupDOM.classList.add("popup_active");
    this.overlayDOM.addEventListener("mousedown", e => {
      if (e.target.classList.contains("overlay")) {
        this.close();
      }
    });
    document.addEventListener("keydown", this._escButtonHandler.bind(this));
  }

  close() {
    this.overlayDOM.removeEventListener("click", this.close);
    this.overlayDOM.classList.remove("overlay_active");
    this.popupDOM.classList.remove("popup_active");
    document.removeEventListener("keydown", this._escButtonHandler);
  }
}

class RegistrPopup extends Popup {
  create() {
    this.open();
    this._setRegistrPopup();
  }

  _setRegistrPopup() {
    this._clearContentForm();
    this.popupTitle.textContent = "Регистрация";

    const form = registrFormElem.create();
    const popupBtn = form.querySelector(".popup__button");
    form.addEventListener("submit", event => {
      event.preventDefault();
      popupBtn.classList.remove("popup__button_active");
      popupBtn.setAttribute("disabled", true);
      const formData = form.getInfo();
      mainApiElem
        .singup(formData.email.toLowerCase(), formData.password, formData.name)
        .then(data => {
          if (data.status != 201) {
            throw data;
          } else {
            successPopupElem.create();
          }
        })
        .catch(err => {
          if (err.status === 500 || !err.status) {
            form.setServerError("Ошибка на сервере");
          } else {
            form.setServerError(err.message);
          }
        })
        .finally(() => {
          popupBtn.classList.add("popup__button_active");
          popupBtn.removeAttribute("disabled");
        });
    });

    const p = createElem("p", "popup__link", "или ");
    const a = document.createElement("a");
    a.textContent = "Войти";
    a.addEventListener("click", event => {
      event.preventDefault();
      loginPopupElem.create();
    });
    p.append(a);
    this.popupBlock.append(form);
    this.popupBlock.append(p);
  }
}

class LoginPopup extends Popup {
  create() {
    this._setAuthPopup();
  }

  _setAuthPopup() {
    this._clearContentForm();
    this.popupTitle.textContent = "Вход";

    const form = loginFormElem.create();
    const popupBtn = form.querySelector(".popup__button");
    form.addEventListener("submit", event => {
      event.preventDefault();

      popupBtn.classList.remove("popup__button_active");
      popupBtn.setAttribute("disabled", true);
      const formData = form.getInfo();
      mainApiElem
        .singin(formData.email.toLowerCase(), formData.password)
        .then(data => {
          if (data.name) {
            changeHeader(true, data.name, mainApiElem);
            this.close();
          } else {
            throw data;
          }
        })
        .catch(err => {
          console.log("err", err.status);
          if (err.status === 500 || !err.status) {
            form.setServerError("Ошибка на сервере");
          } else {
            form.setServerError("Неправильный логин или пароль");
          }
        })
        .finally(() => {
          popupBtn.classList.add("popup__button_active");
          popupBtn.removeAttribute("disabled");
        });
    });

    const p = createElem("p", "popup__link", "или ");
    const a = document.createElement("a");
    a.textContent = "Зарегистрироваться";
    a.addEventListener("click", event => {
      event.preventDefault();
      registrPopupElem.create();
    });
    p.append(a);
    this.popupBlock.append(form);
    this.popupBlock.append(p);
  }
}

class SuccessPopup extends Popup {
  create() {
    this._setSuccessPopup();
  }

  _setSuccessPopup() {
    this._clearContentForm();
    this.popupTitle.textContent = "Пользователь успешно зарегистрирован!";
    const a = document.createElement("a");
    a.classList.add("popup__enter");
    a.textContent = "Выполнить вход";
    a.addEventListener("click", event => {
      event.preventDefault();
      this._setAuthPopup();
    });
    this.popupBlock.append(a);
  }
}

export { Popup, RegistrPopup, LoginPopup, SuccessPopup };
