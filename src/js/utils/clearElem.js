const cleanElem = el => {
  while (el.firstChild) el.removeChild(el.firstChild);
};

export default cleanElem;
