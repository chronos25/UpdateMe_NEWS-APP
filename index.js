const request = require('request');
const express = require('express');
const axios = require('axios');
const http = require('http');

const bodyparser = require('body-parser');
const hostname = 'localhost';
const apiKey = 'XXXXXXX'; 
const app =express();


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/',function(req,res){
	 const url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
	 axios.get(url).then(response=>{
		const articles = response.data.articles;
		const articlesLength = articles.length;
		console.log("articlesLength :- ",articlesLength);
		for( i=0;i<articlesLength;i++)
		{
			var sourceName = articles[i].source.name;
			console.log("sourceName : ",sourceName);
			var author = articles[i].author;
			if(author)
				{
					console.log("author : ",author);
				}
			else{
				console.log("unknown source ");
				author = "unknown source";
			}
			var title = articles[i].title;
			console.log("Title : ",title);
			const desc = articles[i].description;
			console.log('Descrition : ',desc);

			
			
		}

		
	 })
	 .catch(error =>{
		 console.log(error);
	 })
 }) 

app.listen(3000,function(){
	console.log("Started Successfully ");
});