import  express, { request, response } from "express";
import { fetchData } from "./fetchData.js";
import cors from "cors";



const app= express();
app.use(express.json()); 
app.use(cors());

// const PORT=9000;
const PORT= process.env.PORT || 9000;
app.listen(PORT,()=>console.log("Server started at port",PORT));



app.get("/",(request,response)=>{
    response.send("Hello World $$$🌎");
});


//---------------------------------

import { MongoClient } from "mongodb";
import dotenv from "dotenv";


// const MONGO_URL="mongodb://localhost";
dotenv.config();
const MONGO_URL=process.env.MONGO_URL;

async function  createConnection() {
   const client=new MongoClient(MONGO_URL);
   await client.connect()
   console.log("MongoDB Connected");
   return client;
}
// createConnection();

export const client = await createConnection();



//---------- amazon data ------------------------



let amazonUrl=[
    "https://www.amazon.in/dp/B084HZRFH6/ref=s9_acsd_al_bw_c2_x_0_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B098XLXDRS/ref=s9_acsd_al_bw_c2_x_1_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031&th=1",
    "https://www.amazon.in/dp/B098P1K6W9/ref=s9_acsd_al_bw_c2_x_2_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B099ZZ13JB/ref=s9_acsd_al_bw_c2_x_3_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B09G3CWM3J/ref=s9_acsd_al_bw_c2_x_4_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B098XM2SJ4/ref=s9_acsd_al_bw_c2_x_5_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B08R777GBL/ref=s9_acsd_al_bw_c2_x_6_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B08MQ7QKHJ/ref=s9_acsd_al_bw_c2_x_7_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B08DHHB2W1/ref=s9_acsd_al_bw_c2_x_8_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031",
    "https://www.amazon.in/dp/B08N5VSQNG/ref=s9_acsd_al_bw_c2_x_9_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-5&pf_rd_r=6TS7CXBSZDMMH8K8HNYJ&pf_rd_t=101&pf_rd_p=a11b11f6-f341-424b-bb75-77bb48615999&pf_rd_i=1375424031"
];


function amazon(){
  const idValues={
    title:"#productTitle",
    picture:"#landingImage",
    mrp:".priceBlockStrikePriceString",
    price:"#priceblock_ourprice",
    site:"amazon"
} 
amazonUrl.map((url)=> fetchData(url,idValues));
}
amazon();

app.get("/amazon",async(request,response)=>{
    const data= await getAmazonData({})
    response.send(data);
})
async function getAmazonData(filter){
    return await client
    .db("web-scraping")
    .collection("amazon")
    .find(filter)
    .toArray();
 }
//-------------------------------------------------------------------------



//--------------flipkart data---------------------



let flipkartUrl = ["itm81d679403c2b4", "itm162375acb8370", "itma0d1e81b14743",
    "itm30c755943bea0", "itma00a19e11c81b", "itm7dd84770173a5",
    "itm9c57c2a56c825", "itmf123866f9d6dd", "itm5d6f2871d1bbf",
    "itmfb30d06b478fc"];


function flipkart(){
    const idValues={
    title:".B_NuCI",
    picture:"._396cs4",
    mrp:"._3I9_wc",
    price:"._30jeq3",
    site:"flipkart"
} 
flipkartUrl.map((url) => fetchData(`https://www.flipkart.com/redmi-9i-sea-blue-64-gb/p/${url}`,idValues));
}
flipkart();




app.get("/flipkart",async(request,response)=>{
    const data= await getFlipkartData({})
    response.send(data);
})
async function getFlipkartData(filter){
    return await client
    .db("web-scraping")
    .collection("flipkart")
    .find(filter)
    .toArray();
 }
//---------------------------------------------




//-------------------Snapdeal data--------------------------



let SnapdealUrl = ["627802238637","653731982232","641633141331",
"649428763730","636889933167","686699009830",
"672668370556","666238113559","661931683995",
"677731226553"];






function snapdeal(){
    const idValues={
    title:".pdp-e-i-head",
    picture:".cloudzoom",
    mrp:".pdpCutPrice",
    price:".payBlkBig",
    site:"Snapdeal"
} 
SnapdealUrl.map((url) =>    fetchData(`https://www.snapdeal.com/product/royal-ro335-bluetooth-over-ear/${url}`,idValues));
}
snapdeal();


app.get("/snapdeal",async(request,response)=>{
    const data= await getSnapdealData({})
    response.send(data);
})
async function getSnapdealData(filter){
    return await client
    .db("web-scraping")
    .collection("Snapdeal")
    .find(filter)
    .toArray();
 }





// -----------Refreshing aftr 12 hrs---------------

//  const Track=()=>{
//     flipkart();
//     amazon();
//     snapdeal();
//     setTimeout(Track,43200000);
// };
// Track();