const express=require('express');
const app=express();
//const morgan=require('morgan');

app.set('view engine','ejs');
app.set('views','./express2views');

app.use((req,res,next)=>{ //a middleware to log requests. next is a callback saying continue to next code to express
    console.log('request made')
    console.log('host:',req.hostname);
    console.log('path',req.path);
    console.log('method',req.method);//browser hangs itself here. express dont know what to do next after executing this. We use the next function
    next(); 
}); 

app.use((req,res,next)=>{
    console.log("we are in the next block");
    next();
});

app.use(morgan('dev')); //a third party middleware to log requests in consoles
app.use(express.static('public')); //a middleware to help access static files //all the files in public folder are now public or can be accessed




app.get('/',(req,res)=>{
    const blogsList=[ //blogsList is an array of objects
       {title:'My First Post' ,snippet:'experiment post1'},
        {title:'My Second Post' ,snippet:'experiment post2'},
        {title:'My Third Post' ,snippet:'experiment post3'},

    ];
    res.render('index',{sentTitle:'home',blogsList});
});

app.get('/about',(req,res)=>{
    res.render('about',{sentTitle:'About'});
});

app.get('/blog/create',(req,res)=>{
    res.render('create',{sentTitle:'Create Blog'});
});

app.use((req,res)=>{ //this is fired if a response is not already sent
    res.status(404).render('404',{sentTitle:'404'});
});

