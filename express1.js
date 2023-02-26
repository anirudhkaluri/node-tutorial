const express=require('express'); //returns an function. we are storing that in express
const app=express(); //set up an express app. we are invoking express() to store an instance of the app in app variable


app.set('view engine','ejs');
app.set('views','./express1views');
app.get('/',(req,res)=>{
    const blogsList=[ //blogsList is an array of objects
       {title:'My First Post' ,snippet:'experiment post1'},
        {title:'My Second Post' ,snippet:'experiment post2'},
        {title:'My Third Post' ,snippet:'experiment post3'},

    ];
    res.render('index',{sentTitle:'home',blogsList}); //go to index.ejs to find where they will be seen //blogsList no need to write it in parameter_name:parameter_value type. it will obtains blogsList value

});

app.get('/about',(req,res)=>{
    res.render('about',{sentTitle:'About'});
});

/*
app.get('/about-us',(req,res)=>{ //to display redirect
    res.redirect('/about');

});
*/

app.get('/blogs/create',(req,res)=>{
    res.render('create',{sentTitle:'Create Blog'});
});
app.use((req,res)=>{ 
    res.status(404).render('404',{sentTitle:'404'});
});

app.listen(3000);