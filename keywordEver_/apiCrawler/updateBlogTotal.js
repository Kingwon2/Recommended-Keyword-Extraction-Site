import blogApi from "./searchApi"
import mongodb from "mongodb"

let MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


export const updateBlogTotal = async function () {
        console.log('블로그 api작동');
        let client = await MongoClient.connect(url,
            { useNewUrlParser: true });
        let db = client.db('keywordEver');
        let blogTotal = 0;
        let num = 2;
        try {
            const col = db.collection('keyword');
            const Keywords = await db.collection("keyword").find({$and :  [{"amtTotal" : { $gt: 0 },"isCompleteness" : false}]}).limit(10).toArray();
            const promises = Keywords.map(async function(item){
                // num = 3
                blogTotal = await blogApi.cal_BlogSearch(item.keywordName);
                // console.log(typeof(item.total));
                try{                          
                    console.log(typeof(item.competition))
                    await col.updateOne({ "keywordName": item.keywordName }, { $set: { "blogTotal": blogTotal.total, "isCompleteness" : true, 
                    "competition" : (blogTotal.total/item.amtTotal).toFixed(4) } });
                } catch(error){
                    await col.updateOne({ "keywordName": item.keywordName }, { $set: { "blogTotal": 0, "isCompleteness" : true } });
                    console.log(item.keywordName, '해당 블로그 없음');
                }
                // console.log(num);
            });
            await Promise.all(promises);
            // console.log('테스트');            
            //     await col.updateOne({ "keywordName": item.keywordName }, { $set: { "blogTotal": result.total } });
            //     console.log(result.total);
            //     console.log(num);
            //     }).catch( function (err) {
            //         console.log(err);
            //         await col.updateOne({ "keywordName": item.keywordName }, { $set: { "blogTotal": 0 } });
            //     })                
            // });
        //     .forEach(async function (keyword) {
        //         num = num + 1;
                 
            //  });
        } catch (error) {
            console.log('디비에러');
        }
        finally {
            
        }
        
    }
    // )().catch(err => console.error(err));

    //const Keywords = await Keyword.findById(); //isCompleteness가 False인 것을 find => Keywords에 넣어서 배열화
// };


export default updateBlogTotal;