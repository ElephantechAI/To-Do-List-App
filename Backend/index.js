//Here we will be adding our api methods
// to do that we import the npm packages which we just downloaded 
var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");


// we need to create an instance of the express app, and make it use the corse module 
var app=Express();
app.use(cors());


//next we add the connection string of mongodb
var connection_string="mongodb+srv://admin:4MU9aGOuoyiPmaFZ@cluster0.pxgzq4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";








// next we add the database name for making the mongodb conexion
var DATABASENAME="todoappdb"
// and also instianciate the mongodb client 
var database; 
// app.listen will start the express app and will listen to the requests coming from the mentioned port number 
// Afterwards between the curly brackets, we instantiate our mongodb client using the onnection string and the creative database name
// once connection is successfull we will display a sucess message
// we check if we were able to make the connection by typing node index.js to start the backend server using the command window 
// and then going to the navigator and in the url tab write the localhost:
app.listen(5038, ()=>{
    Mongoclient.connect(connection_string,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    });
})


// now we will add the api method to get all nodes data from monodb collection
app.get('/api/todoapp/GetNotes',(request,response)=>{
    database.collection("todoappcollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

// afterwards we need to check if this works by going to the cmd window and writing ^C
// and then going to the navigator and in the url tab write the localhost:
// we can see that it works in the navigator and we can see the data from our notes collection previously added

// After we need to add the method to add and delete the notes in our collection
// we will a simple logic to autocalculate the id field based on the number of docs in the collection

app.post('/api/todoapp/AddNotes', multer().none(),(request,response)=>{
    database.collection("todoappcollection").count({},function(error,numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        //and send the sucess response
        response.json("Added Succesfully");
    })
})

// Now we will add the method to delete the give document from the collection

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    database.collection("todoappcollection").deleteOne({})
// we will be deleting the documment based on the id, which we will be sending via the query string 

// Once deleted, we shall send the success message as response 
    response.json("Delete Successfully");
});