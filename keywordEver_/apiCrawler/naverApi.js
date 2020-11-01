import request from "sync-request";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

//input.json 대신 keyword로 해줬음!
const getKeywordAmt = function (keyword) {
  // for (var i = 0; i < relKeyword.length; i++) {
  //   relKeywords.push(arr[i].keyword.replace(/ /g, "")); //replace와 정규식을 사용해 공백제거해줌
  // }
  let relKeywords = [];
  const timestamp = new Date().getTime();
  var hash = CryptoJS.HmacSHA256(
    timestamp + ".GET./keywordstool",
    "AQAAAAABKokNGec8V9OpTAJxQxp1uqfqM+BLKHtkghRY0Ye4TA=="
  ); // API Secret goes here
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  const header = {
    "X-Timestamp": timestamp,
    "X-API-KEY":
      "0100000000012a890d19e73c57d3a94c0271431a7516f9252f3881e729a7ac9fbeccfb8c97", // API Key goes here
    "X-Customer": "1464526", // Customer ID goes here
    "X-Signature": hashInBase64,
  };
  const requestUrl =
    "https://api.naver.com/keywordstool?showDetail=1&hintKeywords=";
  const response = request("GET", requestUrl + encodeURIComponent(keyword), {
    headers: header,
  });
  const parseResponse = JSON.parse(response.body);
  for (let x = 0; x < parseResponse.keywordList.length; x++) {
    relKeywords.push({
      relKeyword: parseResponse.keywordList[x].relKeyword,
      monthlyPcQcCnt: parseResponse.keywordList[x].monthlyPcQcCnt,
      monthlyMobileQcCnt: parseResponse.keywordList[x].monthlyMobileQcCnt,
    });
  }

  return relKeywords;
};

export default getKeywordAmt;
