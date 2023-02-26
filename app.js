
const func=require('./logger');
func('anirudh');
console.log(__filename);
console.log(__dirname);
const mod=require('path');
var obj=mod.parse(__filename);
console.log(obj);
const mod1=require('os');
var total=mod1.totalmem();
var free=mod1.freemem();
console.log('total memory='+total);
console.log(`Free Memory:${free}`);

/*
const EventEmitter=require('events');
const emitter=new EventEmitter();


emitter.on('messageLogged',function(){ //the function() is the callback function which is called when the event happens. it is the actual listener.
    console.log('Listener called');
});


emitter.emit('messageLogged');
*/

/*
const http=require('http'); //http module is loaded
const server=http.createServer(); //server is an event emitter object.
server.on('connection',(socket)=>{ //name of the event is connection. the listener is function with one argumet of Socket class
    console.log('new connection');
});  
console.log('listening on port 3000');
server.listen(3001); //we are listening to port 3000 
*/

/*
const http=require('http');
var server=http.createServer((req,res)=>{ //this is ES6 convention. You can write createServer(function(req,res){});
    if(req.url==='/'){
        res.write("hello world");
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3003);
*/

/*
const EventEmitter=require('events');
var emitter=new EventEmitter();
emitter.on('messageLogged', function(arg){
    console.log(arg.id+' '+arg.url);
});
emitter.emit('messageLogged',{id:1,url:'http/lol.com'});
*/

/* function sayHello(name){
    console.log(module);
}
sayHello(); */

const http=require('http');
const fs=require('fs');
const _=require('lodash');

var server=http.createServer((req,res)=>{
    var path='./Views';
    const num=_.random(20,40);
    console.log(num);
    var greet=_.once(()=>{
        console.log('hi');
    });
    greet();
    greet();
    res.setHeader('Content-Type','text/html');
    switch(req.url){
        case '/':
            path+='/index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='/about.html';
            req.statusCode=200;
            break;
        case '/about-us':
            res.setHeader('Location','/about');
            res.statusCode=301;
            res.end();
            break;
        default:
            path+='/404.html';
            res.statusCode=404;
            break;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
           
            console.log('connection made');
            res.write(data);
        }
        res.end();
    });
});
server.listen(3000,'localhost',()=>{

    console.log('listening to port 3000');
});