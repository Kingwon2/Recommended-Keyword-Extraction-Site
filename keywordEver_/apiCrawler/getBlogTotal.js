import axios from "axios";
import cheerio from "cheerio";

const getBlogTotals = async function (keyword) {
    const url =
        "https://search.naver.com/search.naver?query=" +
        encodeURI(keyword) + "&where=post&sm=tab_nmr&nso=";

    const getHtml = async () => {
        try {
            return await axios.get(url); // axios.get 함수를 이용하여 비동기로 네이버의 html 파일을 가져온다.
        } catch (error) {
            console.error(error);
        }
    };

    const getBlogTotal = await getHtml().then((html) => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $(
            "#main_pack > div.blog.section._blogBase._prs_blg > div > span" //div.ah_list.PM_CL_realtimeKeyword_list_base ul.ah_l
        ); //li.ah_item

        blogTotal = parseInt($bodyList.text().split("/ ")[1].split("건")[0].replace(",", ""));
        console.log(blogTotal)
        return blogTotal;
    });

    return getBlogTotal;
};

export default getBlogTotals;