//const MongoClient = require('Mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

//var obj =new ObjectID();
//console.log(JSON.stringify(obj));
MongoClient.connect('mongodb://localhost:27018/mongo-db1',(err,db)=>{
    if(err){
        return console.log('unable to connect MongoDB server');
    }
    console.log('conected to MongoDB server');
//    db.collection('Todos').find({
//        _id: new ObjectID('5c133cdd210de11a6892163e')
//        }).toArray().then((docs)=>{
//        console.log('Todos');
//        console.log(JSON.stringify(docs,undefined,2));
//        //db.close();
//        
//    },(err)=>{
//        console.log('unable to fetch',err);
//        //db.close();
//    });
    db.collection('user').find({name:'mark'}).toArray().then((docs)=>{
//        console.log(`Todos count: ${count}`);
        console.log(JSON.stringify(docs,undefined,2));
        //db.close();
        
    },(err)=>{
        console.log('unable to fetch',err);
        //db.close();
    });
    //db.close();
    });