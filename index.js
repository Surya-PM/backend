import  express, { request, response } from "express";
import { fetchData } from "./fetchData.js";



const app= express();
app.use(express.json()); 
const PORT=9000;
app.listen(PORT,()=>console.log("Server started at port",PORT));



app.get("/",(request,response)=>{
    response.send("Hello World $$$🌎");
});


//---------------------------------

import { MongoClient } from "mongodb";
import dotenv from "dotenv";


const MONGO_URL="mongodb://localhost";

dotenv.config();
async function  createConnection() {
   const client=new MongoClient(MONGO_URL);
   await client.connect()
   console.log("MongoDB Connected");
   return client;
}
// createConnection();

export const client = await createConnection();



//---------- amazon data ------------------------
// import { FetchData } from "./FetchData.js";


let amazonUrl=["B084HZRFH6","B098P1K6W9","B098XLXDRS",
                "B099ZZ13JB","B09G3CWM3J","B098XM2SJ4",
                "B08R777GBL","B08MQ7QKHJ","B08DHHB2W1",
                "B08N5VSQNG"];
// amazonUrl.map((url)=> FetchData(`https://www.amazon.in/dp/${url}`));


function amazon(){
  const idValues={
    title:"#productTitle",
    picture:"#landingImage",
    mrp:".priceBlockStrikePriceString",
    price:"#priceblock_ourprice",
    site:"amazon"
} 
amazonUrl.map((url)=> fetchData(`https://www.amazon.in/dp/${url}`,idValues));
}
// amazon();

app.get("/amazon",async(request,response)=>{
    const data= await getData({})
    response.send(data);
})
async function getData(filter){
    return await client
    .db("firstdb")
    .collection("amazon")
    .find(filter)
    .toArray();
 }
//-------------------------------------------------------------------------



//--------------flipkart data---------------------
// import { fetchFlipkartData } from "./fetchFlipkartData.js";



let flipkartUrl = ["itm81d679403c2b4", "itm162375acb8370", "itma0d1e81b14743",
    "itm30c755943bea0", "itma00a19e11c81b", "itm7dd84770173a5",
    "itm9c57c2a56c825", "itmf123866f9d6dd", "itm5d6f2871d1bbf",
    "itmfb30d06b478fc"];

// flipkartUrl.map((url) => fetchFlipkartData(`https://www.flipkart.com/redmi-9i-sea-blue-64-gb/p/${url}`));

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
// flipkart();




app.get("/flipkart",async(request,response)=>{
    const data= await getFlipkartData({})
    response.send(data);
})
async function getFlipkartData(filter){
    return await client
    .db("firstdb")
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



// SnapdealUrl.map((url) =>    fetchData(`https://www.snapdeal.com/product/royal-ro335-bluetooth-over-ear/${url}`,idValues));



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
// snapdeal();


app.get("/snapdeal",async(request,response)=>{
    const data= await getSnapdealData({})
    response.send(data);
})
async function getSnapdealData(filter){
    return await client
    .db("firstdb")
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