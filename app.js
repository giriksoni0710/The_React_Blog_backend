
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb')


app.use(bodyParser.json());

// common db information function

const withdb =  async (operations) =>{

    try{
       
        const connection = await mongodb.connect('mongodb://localhost:27017', { useNewUrlParser: true })
        
        const db = connection.db('my-blog');
    
        await operations(db);
       
        connection.close()
        }
        catch(err){
            console.log(err)
            res.send("there is an error ",err)
        }


}


//getting article details

app.get('/articles/:name',async (req, res)=>{

    withdb(async (db, res)=>{

    
    const article_name = req.params.name;

    const articlesinfo = await db.collection('articles').findOne({});
        
    res.status(200).send(articlesinfo);

    });
})

//increase upvote everytime the request is made

app.post('/articles/:name/upvote',async (req, res)=>{


    withdb(async (db)=>{
    const article_name = req.params.name;

    const article_upvotes = await db.collection('articles').findOne({ name: article_name }); 
                            await db.collection('articles').updateOne({name: article_name},
       { '$set': {

        name: article_name,
        upvotes: article_upvotes.upvotes+1
        
        }
    });

    const updated_articleinfo = await db.collection('articles').findOne({ name: article_name })
    
    res.send(updated_articleinfo);

    },res);


})
//adding a comment from the comment 
app.post('/articles/:name/addcomment', async (req, res)=>{

  
    withdb(async (db)=>{
        const username = req.body.username;
        const email = req.body.email;
        const comment = req.body.comment;
    
        const article_name = req.params.name;
    
        const article_upvotes = await db.collection('articles').findOne({ name: article_name }); 
                                await db.collection('articles').updateOne({name: article_name},
           { '$set': {
    
            name: article_name,
            comments: article_upvotes.comments.concat(
                {
                    name: username,
                    comment: comment,
                    email: email
                })
            
            
            }
        },res);
    
        const updated_articleinfo = await db.collection('articles').findOne({ name: article_name })
        
        res.status(200).send(updated_articleinfo);
    })

})


app.listen(3000, ()=>{

console.log("server running on 3000");

})