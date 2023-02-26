//this is an experiment file
/*
const http=require('http');
const file=require('fs');
const server=http.createServer((req,res)=>{
    path='./Views';
    res.setHeader('Content-Type','text/html');
    switch(req.url){
        case '/':
            path+='/index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='/about.html';
            res.statusCode=200;
            break;
        default:
            path+='/404.html';
            res.statusCode=404;
            break;
    }
    file.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("connection made");
            res.write(data);
        }
        res.end();
    });


});



server.listen(3000,'localhost',()=>{
    console.log('connection made');
});

*/

const express=require('express');
const app=express();

app.set('views','./myviews');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/',(req,res)=>{
    res.render('/');
});
app.get('/blogs/create',(req,res)=>{
    res.render('create');
});
app.use((req,res)=>{
    res.status(404).render('404');
});

app.listen(3000);