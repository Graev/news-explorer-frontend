import sortKeyword from "./sortKeyword";
import num2str from "./num2str";

const keywordsCreate = data => {
  const keywords = sortKeyword(data);

  const keywordsStr = document.querySelector(".lk__key-words");
  if (keywords.length) {
    keywordsStr.textContent = "По ключевым словам: ";
    const keywordsReview = document.createElement("b");
    if (keywords.length <= 2) {
      if (keywords.length == 1) {
        keywordsReview.textContent = `${keywords[0]}`;
        keywordsStr.append(keywordsReview);
      } else {
        keywordsReview.textContent = `${keywords[0]}, ${keywords[1]}`;
        keywordsStr.append(keywordsReview);
      }
    } else if (keywords.length > 2) {
      keywordsReview.textContent = `${keywords[0]}, ${keywords[1]}`;
      keywordsStr.append(keywordsReview);
      keywordsStr.append(" и ");
      const keywordsAnother = document.createElement("b");
      keywordsAnother.textContent = `${keywords.length -
        2} ${num2str(keywords.length - 2, ["другое", "другим", "другим"])}`;

      keywordsStr.append(keywordsAnother);
    }
  }

  return keywordsStr;
};

export default keywordsCreate;
