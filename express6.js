const express=require('express');
const app=express();
const blogRoutes=require('./Routes/blogRoutes2');
const mongoose=require('mongoose');
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./express2views');
const dbURI='mongodb+srv://anirudhkaluri:Walking%401234@nodeapps.yx4jxxr.mongodb.net/Node1?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

app.use(blogRoutes);

//app.use('/lol',blogRoutes); this is scoping the blogRoutes.
//blogRoutes will be used for urls ending with /lol/xyz
//localhost:3000/lol/blogs will be routed to the blogRoutes.js file 
//it will execute router.get('/blogs',(req,res)=>{}); route

app.use((req,res)=>{
    res.status(404).render('404',{sentTitle:'404'});
});