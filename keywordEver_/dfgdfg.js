import naverApi from "./naverApi";
import blogApi from "./searchApi"
import mongodb from "mongodb"

let MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


export const updateAmt = async function () {
    (async () => {
        let client = await MongoClient.connect(url,
            { useNewUrlParser: true });

        let db = client.db('keywordEver');
        let getKeywordAmt = null;
        let amtPc = 0;
        let amtMobile = 0;
        let amtTotal = 0;
        try {
            const col = db.collection('keyword');
            const Keywords = await db.collection("keyword").find().toArray();
            const promises = Keywords.map(async function (keyword) {
                try {
                    getKeywordAmt = naverApi(keyword.keywordName)[0];
                    console.log('success');
                    amtPc = getKeywordAmt.monthlyPcQcCnt;
                    amtMobile = getKeywordAmt.monthlyMobileQcCnt;
                    amtTotal = amtPc + amtMobile;
                    console.log(amtPc, amtMobile);
                    await col.updateOne({ "keywordName": keyword.keywordName }, { $set: { "amtTotal": amtTotal } });
                } catch (error) {
                    console.log('연관검색어 없음');
                    getKeywordAmt = null;
                    amtPc = 0;
                    amtMobile = 0;
                    amtTotal = 0;
                }
            });
            Promise.all(promises);
        } catch (error) {
            console.log('디비에러');
        }
        finally {
            client.close();
        }
    })()
        .catch(err => console.error(err));

    //const Keywords = await Keyword.findById(); //isCompleteness가 False인 것을 find => Keywords에 넣어서 배열화
};


export default updateAmt;