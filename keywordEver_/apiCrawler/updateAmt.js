import naverApi from "./naverApi";
import blogApi from "./searchApi"
import mongodb from "mongodb"

let MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function foo(num){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            console.log('대기');
            resolve("async는 Promise방식을 사용합니다.");
        }, 5000*num);
    });
}

export const updateAmt = async function () {
    console.log('amt api 작동');
    let client = await MongoClient.connect(url,
        { useNewUrlParser: true });
    let db = client.db('keywordEver');
    let getKeywordAmt = null;
    let amtPc = 0;
    let amtMobile = 0;
    let amtTotal = 0;
    let num = 0;
    try {
        const col = db.collection('keyword');
        const Keywords = await db.collection("keyword").find({"isAmtCompleteness" : false}).toArray();
        const promises = Keywords.map(async function (keyword) {
            num = num + 1;
            await foo(num); //num
            try {
                getKeywordAmt = naverApi((keyword.keywordName.replace(/(\s*)/g, "")))[0];
                console.log(getKeywordAmt);
                amtPc = getKeywordAmt.monthlyPcQcCnt;
                amtMobile = getKeywordAmt.monthlyMobileQcCnt;
                amtTotal = amtPc + amtMobile;
                await col.updateOne({ "keywordName": keyword.keywordName }, { $set: { "amtTotal": amtTotal, "isAmtCompleteness" : true} });
                console.log(amtPc, amtMobile);    
            } catch (error) {
                console.log('연관검색어 없음');
                getKeywordAmt = null;
                amtPc = 0;
                amtMobile = 0;
                amtTotal = 0;
                await col.updateOne({ "keywordName": keyword.keywordName }, { $set: { "amtTotal": amtTotal, "isAmtCompleteness" : true} });
            }
        });
        await Promise.all(promises);
        console.log('end');
    } catch (error) {
        console.log('디비에러');
    }
    finally {
        client.close();
    }
}
   
    // )().catch(err => console.error(err));

    //const Keywords = await Keyword.findById(); //isCompleteness가 False인 것을 find => Keywords에 넣어서 배열화
// };


export default updateAmt;