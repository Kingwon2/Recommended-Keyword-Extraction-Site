import Keyword from "../models/Keyword";
import mongodb from "mongodb"
let MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
export const home = async (req, res) => {
  let dailyKeywordsz = [null, null, null, null, null, null, null, null, null, null];
  try {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true
  });
  let db = client.db('keywordEver');
    const col = db.collection('keyword');
    
      let i = -1;
      const keywords = await db.collection("keyword").find({"isCompleteness" : true})
      .sort({"competition" : 1}).limit(10).toArray();
      // console.log(keywords);
      // console.log('qwe');
      // console.log(keywords);
      try{
      keywords.forEach(async function(item){
       i = i + 1;
       dailyKeywordsz[i] = item.keywordName;
      //  console.log(dailyKeywordsz[i]);
       });
     }catch(error){
       console.log(error);
     } 
}catch(error){
  console.log('디비 접속 에러');
}

  res.render("home", {
    pageTitle: "Home",
    dailyKeywords : dailyKeywordsz
  });

}
export const dailyKeyword = (req, res) =>
  res.render("dailyKeyword", {
    pageTitle: "Daily Keyword"
  });