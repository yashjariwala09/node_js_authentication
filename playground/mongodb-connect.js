//const MongoClient = require('Mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

//var obj =new ObjectID();
//console.log(JSON.stringify(obj));
MongoClient.connect('mongodb://localhost:27018/mongo-db1',(err,db)=>{
    if(err){
        return console.log('unable to connect MongoDB server');
    }
    console.log('conected to MongoDB server');
////    db.collection('Todos').insertOne({
////        text:'Something not to do',
////        completed: false
////    },(err,result)=>{
////        if(err){
////            return console.log('unable to insert todo', err);
////        }    
////        console.log(JSON.stringify(result.ops,undefined,2));
////    });
//        db.collection('user').insertOne({
//            name:'yash',
//            age:21,
//            location:'surat'
//        },(err,res)=>{
//            if(err)
//            {
//             return console.log("Not inserted!");
//            }
//            console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,2));
//            db.close();
//        });
    db.close();
    });
