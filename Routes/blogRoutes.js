const Blog=require('../models/blog');
const express=require('express');

const router=express.Router(); //creates new instance of router object
//now replace all the app requests we pasted from express4.js
//replace app with router
//we are attaching the handlers to the routers

router.get('/',(req,res)=>{ //home page redirects to different blogs
    res.redirect('/blogs');
});

//show the about page
router.get('/about',(req,res)=>{
    res.render('about',{sentTitle:'About'});
});


//from here onward blog functionality

//show all blogs
router.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1}) //we are gonna pass it to index.ejs //sort function uses createdAt parameter for sort criteria.-1 for descending
    .then((result)=>{ //it is expecting two paramters
        res.render('index',{sentTitle:'All Blogs', blogsList:result});
    })
    .catch((err)=>console.log(err));
});

//creating a blog
router.get('/blogs/create',(req,res)=>{
    res.render('create',{sentTitle:'Add'});
});

//creating new blog from /blogs/create form //post request
router.post('/blogs',(req,res)=>{
  // console.log(req.body); to test urlencoded middleware we used above.
  const blog=new Blog(req.body);
  blog.save()
  .then((result)=>{
    res.redirect('/blogs');
  })
  .catch((err)=>console.log(err));
});


//get request for /blog/blog_id //it displays a blog when clicked on it in localhost:3000/blogs page
router.get('/blogs/:id',(req,res)=>{
    const id=req.params.id; //accessing the :id
    Blog.findById(id)
    .then((result)=>
    {
        res.render('details',{blog:result, sentTitle:'Blog Details'});
    })
    .catch((err)=>console.log(err));
});

router.delete('/blogs/:id',(req,res)=>{
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

module.exports=router;