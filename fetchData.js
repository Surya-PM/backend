import axios from "axios";
import cheerio from "cheerio";
import { client} from "./index.js";


export const fetchData = (productUrl, idValues) => {
    client
    .db("web-scraping")
    .collection(idValues.site)
    .deleteMany({});
    axios.get(productUrl, {
        headers: {
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36`,
        },
    }).then(({ data }) => {
        const $ = cheerio.load(data);
        let mrpDollarPrice = $(idValues.mrp).text();
        if (idValues.site === "Snapdeal"){
            var mrp = Number(mrpDollarPrice.replace(/[^0-9-]+/g, ""));
        }
        else{
            var mrp = Number(mrpDollarPrice.replace(/[^0-9.-]+/g, ""));
        }
        var finalDollarPrice = $(idValues.price).text();
        if(Number(finalDollarPrice.replace(/[^0-9.-]+/g, ""))===0){
            finalDollarPrice = $("#priceblock_dealprice").text();
            var finalPrice = Number(finalDollarPrice.replace(/[^0-9.-]+/g, ""));
         }
        else{
            var finalPrice = Number(finalDollarPrice.replace(/[^0-9.-]+/g, ""));
         }
        var title = $(idValues.title).text().trim();
        var picture = $(idValues.picture).attr('src');
        let result = {
            title,
            picture,
            mrp,
            finalPrice
        };
         client
            .db("web-scraping")
            .collection(idValues.site)
            .insertOne(result);
    });
};