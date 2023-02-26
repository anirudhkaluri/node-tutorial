const mongoose=require('mongoose');
const Schema=mongoose.Schema; //schema will decide the structure of documents we store in the collection
 //schema defines the structure of documents
const blogSchema=new Schema({ //we pass an object as a parameter to define structure of document
    title: {
        type:String,
        required: true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true}); 
//now create model for that schema
//the model surrounds schema and provides us an interface to communicate with database of that document type

const Blog=mongoose.model('Blog',blogSchema);

//the first argument must be singular of the name of the collections in the database. So now it will look for 'blogs' (automatically pluralised)
// The second argument is the name of the schema which we are using in the documents stored int he collection

module.exports=Blog; //now we can use it in other modules


