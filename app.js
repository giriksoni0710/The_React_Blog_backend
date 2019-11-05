
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());



const articlesinfo = {

    'learn-react': {
      upvotes:  0
    },
    'learn-node': {
        upvotes:  0
    },
    'my-thoughts-on-resumes': {
        upvotes:  0
    }

}

app.post('/articles/:name/upvote', (req, res)=>{


    const article_name = req.params.name;

    articlesinfo[article_name].upvotes += 1; 

    res.status(200).send(`the article has ${articlesinfo[article_name].upvotes} likes`);

    

})


app.post('/articles/:name/addcomment', (req, res)=>{


    const article_name = req.params.name;

    const username = req.body.username;
    const email = req.body.email;
    const comment = req.body.comment;


    
    console.log(username);
    

})


app.listen(3000, ()=>{

console.log("server running on 3000");

})