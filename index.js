const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const https = require("https");
app.use(express.json());
app.use(express.static('public'));
let port = process.env.PORT || 2200


let tweet = [];

request('https://twitter.com/elonmusk',(err,response,body)=>{
    if(!err && response.statusCode == 200);
    {
        const pick = cheerio.load(body);
        pick('p.TweetTextSize').each((index,item)=>{
            tweet.push({
                tweet : item.children[0].data
            })
        })
    }
})


app.get("/",(req,res)=>{
    res.status(200).send(tweet)
})

app.listen(port,()=>{
    console.log(`YOUR API RUNNING :${port}`)
})