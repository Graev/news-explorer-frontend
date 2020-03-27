import createElem from "../utils/createElem";
import clearElem from "../utils/clearElem";

class Form {
  constructor() {
    this.form = document.createElement("form");
    this.form.classList.add("popup__form");
  }

  _cleanForm() {
    //зависит от тз, с одной стороны, удобно, если в форме сохраняется введенное, на случай случайного закрытия, но вдруг будет необходимо
    clearElem(this.form);
  }

  setServerError(error) {
    this.form.querySelector("#buttonError").textContent = error;
    this.form.querySelector("#buttonError").style = "opacity: 1";
  }

  _createEmailBlock() {
    const emailLabel = createElem("label", "popup__label", "Email");
    emailLabel.for = "email";
    const emailInput = createElem("input", "popup__input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.placeholder = "Введите почту";
    emailInput.required = true;
    const emailError = createElem(
      "p",
      "popup__error",
      "Неправильный формат email"
    );
    emailError.id = "emailError";

    this.form.append(emailLabel);
    this.form.append(emailInput);
    this.form.append(emailError);
  }

  _createPasswordBlock() {
    const passwordLabel = createElem("label", "popup__label", "Пароль");
    passwordLabel.for = "password";
    const passwordInput = createElem("input", "popup__input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.placeholder = "Введите пароль";
    passwordInput.required = true;
    const passwordError = createElem(
      "p",
      "popup__error",
      "Неправильный формат пароля"
    );
    passwordError.id = "passwordError";

    this.form.append(passwordLabel);
    this.form.append(passwordInput);
    this.form.append(passwordError);
  }

  _createNameBlock() {
    const nameLabel = createElem("label", "popup__label", "Имя");
    nameLabel.for = "name";
    const nameInput = createElem("input", "popup__input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Введите имя";
    nameInput.required = true;
    const nameError = createElem(
      "p",
      "popup__error",
      "Неправильный формат имени"
    );
    nameError.id = "nameError";

    this.form.append(nameLabel);
    this.form.append(nameInput);
    this.form.append(nameError);
  }

  getInfo() {
    const data = {};
    this.form.querySelectorAll("input").forEach(elem => {
      data[elem.name] = elem.value;
    });
    return data;
  }

  _validateInputElement(event) {
    buttonError.style = "opacity: 0";
    if (event.target.name == "password") {
      if (event.target.value.length < 6) {
        passwordError.style = "opacity: 1";
        this.validateBoolean.password = false;
      } else {
        passwordError.style = "opacity: 0";
        this.validateBoolean.password = true;
      }
    }
    if (event.target.name == "email") {
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(event.target.value)) {
        emailError.style = "opacity: 1";
        this.validateBoolean.email = false;
      } else {
        emailError.style = "opacity: 0";
        this.validateBoolean.email = true;
      }
    }
    if (event.target.name == "name") {
      if (event.target.value.length < 2) {
        nameError.style = "opacity: 1";
        this.validateBoolean.name = false;
      } else {
        nameError.style = "opacity: 0";
        this.validateBoolean.name = true;
      }
    }
    if (this._validateForm()) {
      this.form
        .querySelector(".popup__button")
        .classList.add("popup__button_active");
    } else {
      this.form
        .querySelector(".popup__button")
        .classList.remove("popup__button_active");
    }
  }

  _validateForm() {
    return Object.keys(this.validateBoolean).every(elem => {
      return this.validateBoolean[elem];
    });
  }
}

class RegisterForm extends Form {
  constructor() {
    super();
    this.validateBoolean = {
      email: false,
      password: false,
      name: false
    };
    this._setRegisForm();

    this.form.addEventListener("input", this._validateInputElement.bind(this));

    this.form.getInfo = this.getInfo.bind(this);
    this.form.setServerError = this.setServerError.bind(this);
  }

  create() {
    return this.form;
  }

  deactivBtn() {}

  _setRegisForm() {
    this._createEmailBlock();
    this._createPasswordBlock();
    this._createNameBlock();

    const buttonError = createElem(
      "p",
      "popup__error",
      "Такой пользователь уже есть"
    );
    buttonError.id = "buttonError";
    buttonError.classList.add("popup__error_btn");

    const button = createElem("button", "popup__button", "Зарегистрироваться");

    this.form.append(buttonError);
    this.form.append(button);
  }
}

class LoginForm extends Form {
  constructor() {
    super();
    this.validateBoolean = {
      email: false,
      password: false
    };

    this._setAuthForm();

    this.form.addEventListener("input", this._validateInputElement.bind(this));

    this.form.getInfo = this.getInfo.bind(this);
    this.form.setServerError = this.setServerError.bind(this);
  }

  create() {
    return this.form;
  }

  _setAuthForm() {
    this._createEmailBlock();
    this._createPasswordBlock();

    const buttonError = createElem(
      "p",
      "popup__error",
      "Такой пользователь уже есть"
    );
    buttonError.id = "buttonError";
    buttonError.classList.add("popup__error_btn");

    const button = createElem("button", "popup__button", "Войти");

    this.form.append(buttonError);
    this.form.append(button);
  }
}

export { RegisterForm, LoginForm };
