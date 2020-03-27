import { registrPopupElem } from "../../index";

class Header {
  constructor(isLoggedIn, userName, mainApi) {
    this.props = { isLoggedIn, userName };
    this.mainApi = mainApi;
    this.headerDOM = document.querySelector(".header");
    this.headerMenuDOM = document.querySelector(".header__menu");
    this.authBtn = document.querySelector("#auth-btn");
    this.render();
    document
      .querySelector("#auth-btn")
      .addEventListener("click", this._clickHandler.bind(this));
  }

  _changeProps() {
    this.props.isLoggedIn = false;
  }

  _clickHandler() {
    this.headerDOM.classList.remove("header_active");
    if (localStorage.getItem("token")) {
      this.mainApi
        .logout()
        .then(e => {
          this._changeProps();
          this.render();
          if (location.pathname == "/lk.html") {
            location = "/index.html";
          }
        })
        .catch(err => console.log("logoutError: ", err));
    } else {
      registrPopupElem.create();
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      this.headerMenuDOM.classList.add("header__menu_auth-succes");

      this.authBtn.textContent = this.props.userName;
    } else {
      this.headerMenuDOM.classList.remove("header__menu_auth-succes");

      this.authBtn.textContent = "Авторизоваться";
    }
  }
}

export default Header;
