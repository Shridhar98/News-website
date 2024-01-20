import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()

const port = 2000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/" , async(req , res)=>{
    
    try{
        const result = await axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=4cac12f2a32e4c3697ae1d4b179121e4" );
    // console.log(newsarticle);
        const newsArticles = result.data.articles;
        res.render("index.ejs" , {newsArticles});
        //console.log(typeof(newsarticle));

    }catch(error){
        res.status(404).send(error.message);
    }    
})

app.post("/submit" , async(req , res)=>{
    const search = req.body["searchnews"];
    try{
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=4cac12f2a32e4c3697ae1d4b179121e4` );
        const newsArticles = result.data.articles;
        res.render("search.ejs" , {newsArticles});

    }catch(error){
        res.status(404).send(error.message);
    }    
})

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})




