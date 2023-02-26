
const blogController=require('../controllers/blogController'); //import the blog controller where we wrote functions to handle the requests
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
router.get('/blogs',blogController.blog_index); //we exported these functions in the blogController.js file.

//creating a blog
router.get('/blogs/create',blogController.blog_create_get);

//creating new blog from /blogs/create form //post request
router.post('/blogs',blogController.blog_create_post);

//get request for /blog/blog_id //it displays a blog when clicked on it in localhost:3000/blogs page
router.get('/blogs/:id',blogController.blog_details);

module.exports=router;