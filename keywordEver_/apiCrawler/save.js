var request = require('request');

var client_id = 'eF4c63IeWE_GKBAgTmSD';
var client_secret = 'DsGF7zePFe';
var api_url = 'https://openapi.naver.com/v1/datalab/search';

exports.cal_DataLab = function(keyword, startDate,endDate,period,device, gender){
        return new Promise(function (resolve, reject) {
            var request_body = {
                "startDate": startDate,
                "endDate": endDate,
                "timeUnit": period,
                "keywordGroups": [
                    {
                        "groupName": "키워드",
                        "keywords": [
                keyword
            ]
        }
    ],
                "device": device, // mo 모바일 pc 컴퓨터
                "gender": gender //f 여자 m 남자
            };
            request.post({
                url: 'https://openapi.naver.com/v1/datalab/search',
                body: JSON.stringify(request_body),
                headers: {
                    'X-Naver-Client-Id': client_id,
                    'X-Naver-Client-Secret': client_secret,
                    'Content-Type': 'application/json'
                }
            }, function (error, response, body, callback) {
                if (!error && response.statusCode == 200) {
                    //console.dir(body);
                    body = JSON.parse(body);
                    //console.dir(as.results[0].data);
                    resolve(body);
                    //callback.call(example, body);
                    return;
                }
                else if (error) {
                   reject(obbox);
                }
            });

        })//.then(function(result){
        //    console.dir(result);
        //})
};

//testf().then(function(result){
  //  console.log(result.results[0].data)});
//setTimeout(function(){
//    console.log(em);
//},2000);

        //list=tt.body
        //console.dir(tt);
        //var bb = moduleA(function(result){
        //      console.log(result);
        //    },'치약','month');
        //console.log(bb);
