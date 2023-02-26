const { urlencoded } = require('express');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.set('view engine','ejs');
app.set('views','./express2views');
app.use(express.static('public'));
const Blog=require('./models/blog');

const dbURI='mongodb+srv://anirudhkaluri:Walking%401234@nodeapps.yx4jxxr.mongodb.net/Node1?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

app.use(express.urlencoded()); //takes url encoding data and passes that into an object we can use. Use this middleware. it basically parses.

//hope page which redirects to all blogs page
app.get('/',(req,res)=>{ //home page redirects to different blogs
    res.redirect('/blogs');
});

//show the about page
app.get('/about',(req,res)=>{
    res.render('about',{sentTitle:'About'});
});


//from here onward blog functionality

//show all blogs
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1}) //we are gonna pass it to index.ejs //sort function uses createdAt parameter for sort criteria.-1 for descending
    .then((result)=>{ //it is expecting two paramters
        res.render('index',{sentTitle:'All Blogs', blogsList:result});
    })
    .catch((err)=>console.log(err));
});

//creating a blog
app.get('/blogs/create',(req,res)=>{
    res.render('create',{sentTitle:'Add'});
});

//creating new blog from /blogs/create form //post request
app.post('/blogs',(req,res)=>{
  // console.log(req.body); to test urlencoded middleware we used above.
  const blog=new Blog(req.body);
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  })
  .catch((err)=>console.log(err));
});


//get request for /blog/blog_id //it displays a blog when clicked on it in localhost:3000/blogs page
app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id; //accessing the :id
    Blog.findById(id)
    .then((result)=>
    {
        res.render('details',{blog:result, sentTitle:'Blog Details'});
    })
    .catch((err)=>console.log(err));
});

/*
app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        //we cant redirect cuz it is an ajax request //we need to send back json or text data back to the browser
        //we are gonna send json data which will have the redirect property
        //redirect property is gonna be an url to which we are gonna go
        //that redirect will be done by the server
        res.json({redirect:'/blogs'}); //for sending response which is json. 
    })
    .catch((err)=>console.log(err));

});

*/