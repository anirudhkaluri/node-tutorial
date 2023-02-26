const Blog=require('./models/blog');
const mongoose=require('mongoose');
const express=require('express');
const app=express();

dbURI='mongodb+srv://anirudhkaluri:Walking%401234@nodeapps.yx4jxxr.mongodb.net/Node1?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));


//saving a blog 
app.get('/add-blog',(req,res)=>{ //this is the first piece of code I wrote which interacts with data base.
    const blog=new Blog({//we are using the model create a new instance of a blog document  
        title:'1st post from express3',
        snippet:'this is an express3 file which was created to experiment with mongodb',
        body:'this is an express3 file which was created to experiment with mongodb'
    });
    blog.save() //when we create an instance of blog model it gives many options 
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err)); //this gets saved in the database. this document or instance is added to the 'blogs' collection in the database
    //this is an asynchronous task. it takes some time to get completed. it returns a promise. hence we used then and catch.
});



//retrieve all the blogs. No need to create a new instance.

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err));
});


//retrieve single blog
app.get('/single-blog',(req,res)=>{
    Blog.findById('63abad3e1b2b548c339d8f84') //you can find the id in the mongodb collection. Mongodb doesnt store it as a string. But mongoose will help me convert it.
    .then((result)=>{res.send(result)})
    .catch((err)=>console.log(err));
});

