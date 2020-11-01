import "./db";
import app from "./app";
import cron from "node-cron";
import dotenv from "dotenv";
import "./models/Keyword";
import updateAmt from "./apiCrawler/updateAmt";
import updateBlogTotal from "./apiCrawler/updateBlogTotal";


dotenv.config();

cron.schedule('*/60 * * * *', async () => {
  console.log("1시간마다 updateRealtime")
  updateAmt();
  setTimeout(() => {
    updateBlogTotal();
  }, 120000);
  setTimeout(() => {
    updateBlogTotal();
  }, 240000);
  setTimeout(() => {
    updateBlogTotal();
  }, 360000);
  setTimeout(() => {
    updateBlogTotal();
  }, 480000);
});
// cron.schedule('*/2 * * * *', () => {
//   console.log("2분마다 updateRealtime")
//   //updateAmt();
//   updateBlogTotal();

// });

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);