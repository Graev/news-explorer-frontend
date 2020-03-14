import "../pages/index.css";

import Header from "../js/components/Header";
import MainApi from "../js/api/MainApi";

// const popupClass = new Popup();

const apiClass = new MainApi();

const userData = apiClass.getUserData();
userData
  .then(data => {
    const headerClass = new Header(true, data.data.name);
  })
  .catch(() => {
    const headerClass = new Header(false, null);
  });

function asdasd(ass) {
  console.log("ass", ass);
}

console.log("object", asdasd());
