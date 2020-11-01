import axios from "axios";
import cheerio from "cheerio";

const getRelKeywords = async function (keyword) {
  const url =
    "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" +
    encodeURI(keyword);

  const getHtml = async () => {
    try {
      return await axios.get(url); // axios.get 함수를 이용하여 비동기로 네이버의 html 파일을 가져온다.
    } catch (error) {
      console.error(error);
    }
  };

  const getRelKeyword = await getHtml().then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $(
      "#main_pack > div.blog.section._blogBase._prs_blg > div > h2" //div.ah_list.PM_CL_realtimeKeyword_list_base ul.ah_l
    ).children("span").text(); //li.ah_item
    console.log($bodyList);
    /*
    $bodyList.each(function (i, elem) {
      ulList[i] = {
        blogTotal: $(this).find("a").text(),
        // url:
        //   "https://search.naver.com/search.naver?where=nexearch&query=" +
        //   $(this).find("a").text(),
      };
    });
    */
    const data = ulList.filter((n) => n.blogTotal);
    return data;
  });
  // .then((res) => console.log(res));
  return getRelKeyword;
};

export default getRelKeywords;
