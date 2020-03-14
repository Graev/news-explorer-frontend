import Popup from "./Popup";
import MainApi from "../api/MainApi";

const apiClass = new MainApi();

class Header {
  constructor(isLoggedIn, userName) {
    this.props = { isLoggedIn, userName };
    this.render();
    document
      .querySelector("#auth-btn")
      .addEventListener("click", this._clickHandler.bind(this));
  }

  _changeProps() {
    this.props.isLoggedIn = false;
  }

  _clickHandler() {
    if (this.props.isLoggedIn === true) {
      apiClass.logout().then(e => {
        this._changeProps();
        this.render();
      });
    } else {
      const popupClass = new Popup();
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      document
        .querySelector(".header__menu")
        .classList.add("header__menu_auth-succes");

      document.querySelector("#auth-btn").textContent = this.props.userName;
    } else {
      document
        .querySelector(".header__menu")
        .classList.remove("header__menu_auth-succes");

      document.querySelector(".header__auth-btn").textContent =
        "Авторизоваться";
    }
  }
}

export default Header;
