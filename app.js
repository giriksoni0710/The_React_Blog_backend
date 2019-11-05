
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


// here we store the upvotes and comment data of the article

var articlesinfo = {

    'learn-react': {
      upvotes:  0,
      comments: []
    },
    'learn-node': {
        upvotes:  0,
        comments: []
   
    },
    'my-thoughts-on-resumes': {
        upvotes:  0,
        comments: []
        }

}

//increase upvote everytime the request is made

app.post('/articles/:name/upvote', (req, res)=>{


    const article_name = req.params.name;

    articlesinfo[article_name].upvotes += 1; 

    res.status(200).send(`the article has ${articlesinfo[article_name].upvotes} likes`);

    

})

//adding a comment from the comment 
app.post('/articles/:name/addcomment', (req, res)=>{


    const article_name = req.params.name;

    const username = req.body.username;
    const email = req.body.email;
    const comment = req.body.comment;

    
    
    articlesinfo[article_name].comments.push({username, comment, email});

    console.log(articlesinfo[article_name].comments[0]);

    if(articlesinfo[article_name].comments!=null){
    
        res.send(articlesinfo[article_name]);

    }

    
   
    

})


app.listen(3000, ()=>{

console.log("server running on 3000");

})