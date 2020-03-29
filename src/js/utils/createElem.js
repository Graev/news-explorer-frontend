const createElem = (type, className, text) => {
  const elem = document.createElement(type);
  elem.classList.add(className);
  if (text != undefined) {
    elem.textContent = text;
  }
  return elem;
};

export default createElem;
