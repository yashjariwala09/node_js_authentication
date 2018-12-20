const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



//var id ='5c14b39409819e281da1e2b1';
//
//
//if(!ObjectId.isValid(id)){
//    console.log('Id not valid');  
//}
//Todo.find({
//    _id: id
//}).then((todos)=>{
//   
//    console.log('Todos',todos);
//});
//
//Todo.findOne({
//    _id: id
//}).then((todo)=>{
//   
//    console.log('Todo',todo);
//});
//
//Todo.findById(id).then((todo)=>{
//    if(!todo){
//        return console.log('Id not found');
//    }
//    console.log('Todo by id',todo);
//}).catch((e)=>{console.log(e)});

/*for user*/
//
//User.findById('5c14cd2b62e527b81c26f482').then((user)=>{
//    if(!user){
//        return console.log('unable to find user');
//    }
//    console.log(JSON.stringify(user,undefined,2));
//},(e)=>{
//   console.log(e); 
//});





