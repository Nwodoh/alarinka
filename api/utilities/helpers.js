const fs = require("fs");

exports.urlToImage = (url, savePath) => {
  const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
  const binaryData = Buffer.from(base64Data, "base64");
  fs.writeFile(savePath, binaryData, "binary", (err) => {
    if (err) {
      throw new Error(err);
    }
    return true;
  });
};

exports.parseCookies = (cookieHeader) => {
  if (!cookieHeader?.length) return {};
  const cookies = cookieHeader.split(";");
  const parsedCookies = {};

  cookies.forEach((cookie) => {
    const parts = cookie.split("=");
    const name = parts[0].trim();
    const value = parts[1].trim();
    parsedCookies[name] = value;
  });

  return parsedCookies;
};

const randomizeString = (str = "0123456789", outputLength = str.length) => {
  let randomStr = "";
  for (let i = 0; i < outputLength; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    randomStr += str[randomIndex];
  }
  return randomStr;
};

exports.generateRandomToken = (tokenLength = 6, tokenBY = "0123456789") => {
  const rearrangedStr = randomizeString(tokenBY);
  const token = randomizeString(rearrangedStr, tokenLength);
  return token;
};
