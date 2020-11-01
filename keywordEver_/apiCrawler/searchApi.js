// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var request = require('request');
var client_id = 'eF4c63IeWE_GKBAgTmSD';
var client_secret = 'DsGF7zePFe';

exports.cal_BlogSearch = function (keyword) {
    var sort = 'sim'; //sim 기본값, date 최신순   
    return new Promise(function (resolve, reject) {
        var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(keyword); //'&sort=' + sort json 결과
        var options = {
            url: api_url,
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret,
            }
        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                resolve(body);cmd
                return;
               

            } else if (error) {
                reject(error);
            }
        });

    })
}

 //console.dir(body);
                //console.dir(body['total']);    //블로그 총 발행량
                //console.dir(body['display']);  // 첫 페이지의 블로그 더보기했을시 블로그 개수
                //console.dir(body['items'][0]['title']); // display의 블로그들 하나 접근(제목)
                //console.dir(body['items'][0]['link']); // display의 블로그들 하나 접근(URL)
                //console.dir(body['items'][0]['postdate']); // display의 블로그들 하나 접근(게시날짜)
