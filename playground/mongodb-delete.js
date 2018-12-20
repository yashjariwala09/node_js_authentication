//const MongoClient = require('Mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

//var obj =new ObjectID();
//console.log(JSON.stringify(obj));
MongoClient.connect('mongodb://localhost:27018/mongo-db1',(err,db)=>{
    if(err){
        return console.log('unable to connect MongoDB server');
    }
    console.log('conected to MongoDB server');
//     db.collection('Todos').deleteMany({text:'cat' }).then((result)=>{
//      
//        console.log(result);
//    });
//    db.collection('Todos').deleteOne({text:'cat' }).then((result)=>{
//      
//        console.log(result);
//    });
        db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
           
            console.log(JSON.stringify(result,undefined,2)); 
        },(err)=>{
            console.log(err);
        });
    
    db.close();
    });
