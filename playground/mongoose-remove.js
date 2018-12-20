const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//
//Todo.remove({}).then((result)=>{
//   
//    console.log(result);
//});


Todo.findOneAndRemove({_id:'5c1728ea44b96059660eb9c9'}).then((todo)=>{
   console.log(todo);
    return ;
});
//Todo.findByIdAndRemove('5c14f391f3852aab7a78e36c').then((todo)=>{
//   console.log(todo);
//    
//});