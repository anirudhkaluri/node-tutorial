const Blog=require('../models/blog');


//create functions

//blog_index: to get all the blogs and inject them into index view
//blog_details: get a single blog
//blog_create_get: to send back the actual form
//blog_create_post: to add new blog
//blog_delete: to delete a blog


const blog_index=(req,res)=>{
    Blog.find().sort({createdAt:-1}) //we are gonna pass it to index.ejs //sort function uses createdAt parameter for sort criteria.-1 for descending
    .then((result)=>{ //it is expecting two paramters
        res.render('index',{sentTitle:'All Blogs', blogsList:result});
    })
    .catch((err)=>console.log(err));
}

const blog_details=(req,res)=>{
    const id=req.params.id; //accessing the :id
    Blog.findById(id)
    .then((result)=>
    {
        res.render('details',{blog:result, sentTitle:'Blog Details'});
    })
    .catch((err)=>console.log(err));
}


const blog_create_get=(req,res)=>{
    res.render('create',{sentTitle:'Add'});
}

const blog_create_post=(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
    .then((result)=>{
      res.redirect('/blogs');
    })
    .catch((err)=>console.log(err));
}

module.exports={
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post
}