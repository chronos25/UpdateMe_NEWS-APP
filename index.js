const request = require('request');
const express = require('express');
const axios = require('axios');
const http = require('http');
const passport = require('passport-facebook');
const config = require ('./configration/facebook');

const bodyparser = require('body-parser');
const hostname = 'localhost';
const apiKey = '0fa0b6b239724401b7e2761106a4d65a'; 
const app =express();


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));

// passport.use(new FacebookStrategy ({
// 	clientId : config.facebook_api_key,
// 	clientSecret : config.facebook_api_secret,
// 	callbackURL : config.callback_url

// },(accessToken, refreshToken, profile,cb)=>{
// 	User.findOne({facebookId: profile.id},(err,user)=>{
// 		return cb(err,user);
// 						})
// 				}
// 	));

// app.get('/',function(req,res){
// 	const url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
// 	axios.get(url).then(response=>{
// 	   const articles = response.data.articles;
// 	   const articlesLength = articles.length;
// 	   console.log(response.data);
	   
// 	   //res.render('index',{articles:`${articles}`})
// 	})
// })

app.get('/news',
function(req,res){
	 const url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
	 axios.get(url).then(response=>{
		 
		var sourceName = [] ;
		var author = [];
		var title =[] ;
		var desc= [];
		const articles = response.data.articles;
		const articlesLength = articles.length;
		//console.log("articlesLength :- ",typeof(articles));
		res.render('index',{articles:articles});
		for( i=0;i<articlesLength;i++)
		{	sourceName.push(articles[i].source.name);
			console.log("sourceName : ",sourceName);
			if(author)
				{
					author.push(articles[i].author);
				}
			else{
				author.push('unknown');
			}
			title.push(articles[i].title);
			desc.push(articles[i].description);
		}
	 })
	 .catch(error =>{
		 console.log(error);
	 })
 }) 

app.listen(3000,function(){
	console.log("Started Successfully ");
});