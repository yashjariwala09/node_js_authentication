//const MongoClient = require('Mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

//var obj =new ObjectID();
//console.log(JSON.stringify(obj));
MongoClient.connect('mongodb://localhost:27018/mongo-db1',(err,db)=>{
    if(err){
        return console.log('unable to connect MongoDB server');
    }
    console.log('conected to MongoDB server');
    
    db.collection('user').findOneAndUpdate({
        _id: new ObjectID('5c13448b3468141b3cd8ab2a')
    },{
        $set:
        {
            name:"andrew"    
        } ,
            $inc:{
                age:1
            }
        
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    });
    
    db.close();
    });
