import naverApi from "../apiCrawler/naverApi";
//import naverCrawler from "../apiCrawler/naverCrawler";
import save from "../apiCrawler/save";
import date from "../Date";
import blog from "../apiCrawler/searchApi";
import routes from "../routes";
import Keyword from "../models/Keyword";
import getKeywordAmt from "../apiCrawler/naverApi";


export const search = async (req, res) => {
  let Inputkeyword = req.query.keyword;
  let keyword = Inputkeyword.replace(/(\s*)/g, "");
  let blogarr = [null, null, null, null, null, null];
  let getDataLab = null;
  let getKeywordAmt = null;
  console.log('sdsd');

  try {
    getKeywordAmt = naverApi(keyword);
    for (var i = 1; i < blogarr.length; i++) {
      try {
        blogarr[i] = await blog.cal_BlogSearch(getKeywordAmt[i].relKeyword);
      } catch (error) {
        blogarr[i] = null;
      }
    }
  } catch (error) {
    getKeywordAmt = null;
  }
  try {
    getDataLab = await save                             //1년 통계
      .cal_DataLab(keyword, date.Yearago(1), date.Today(), "month", "", "")
      .then(function (result) {
        return result.results[0].data;
      });


  } catch (error) {
    getDataLab = null;
  }
  //console.log(getDataLab);

  try {
    //const relKeywords = await naverCrawler(keyword);
    // console.log(relKeywords);
    blogarr[0] = await blog.cal_BlogSearch(keyword);

    // const blogData = await blog.cal_BlogSearch(keyword);
  } catch (error) {
    blogarr[0] = null;
  }
  //console.log(getDataLab.length, '길이');

  try {
    res.render("searchResult", {
      pageTitle: "Search",
      keyword: keyword,
      blog: blogarr,
      keyword_amt: getKeywordAmt,
      keyword_year_analysis: getDataLab,
      blogNum: ["1032", "5939", "1234"],
      keywordComp: ["0.12", "0.12", "0.5"],
      dateCal: date
    });

  } catch (error) {
    res.redirect(routes.error);
  }


};



export const searchNaverBlog = (req, res) =>
  res.render("searchNaverBlog", {
    pageTitle: "Searh NaverBlog",
  });
export const searchSmartstore = (req, res) =>
  res.render("searchSmartstore", {
    pageTitle: "Search Smartstore",
  });
export const searchTstoryBlog = (req, res) =>
  res.render("searchTstoryBlog", {
    pageTitle: "Search TstoryBlog",
  });