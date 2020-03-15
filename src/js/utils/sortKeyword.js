const sortKeyword = data => {
  const keywordArray = [];

  Object.keys(data).forEach(elem => {
    const keywordFound = keywordArray.some(e => {
      return e == data[elem].keyword;
    });
    if (!keywordFound) {
      keywordArray.push(data[elem].keyword);
    }
  });
  return keywordArray;
};

export default sortKeyword;
