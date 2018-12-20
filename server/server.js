require('./config/config');
const _=require('lodash'); 
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// const hash = require('./../playground/hashing')

var {mongoose} = require('./db/mongoose');

var {Todo}=require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');
var hbs = require('hbs');
const port = process.env.PORT;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/todos',authenticate,(req,res)=>{
  var todo =new Todo({
      text:req.body.text,
      _creator:req.user._id
    });

    
        console.log(todo._creator);
   
   todo.save().then((doc)=>{  
   res.send(doc);
},(e)=>{
   res.status(400).send(e);
});

   
   
});


app.get('/todos',authenticate,(req,res)=>{
  
   Todo.find({_creator:req.user._id}).then((todos)=>{
       res.send({todos});
       
   },(e)=>{
       res.status(400).send(e);
       
   });
});


app.get('/todos/:id',authenticate,(req,res)=>{
   var id=req.params.id;
   console.log(id);
   if(!ObjectID.isValid(id)){
       return res.status(404).send();
   }
   Todo.findOne({
       _id:id,
       _creator:req.user._id
    }).then((todo)=>{
       if(!todo){
           return res.status(404).send();
       }
       res.send({todo});
   }).catch((e)=>{
       res.status(404).send();
   })
   
//    Todo.find().then((todos)=>{
//        res.send({todos});
//        
//    },(e)=>{
//        res.status(400).send(e);
//        
//    });
});



app.delete('/todos/:id',authenticate,(req,res)=>{
  
   var id=req.params.id;
   console.log(id+"hi");
   if(!ObjectID.isValid(id)){
       return res.status(404).send();
   }
   Todo.findByIdAndRemove(id).then((todo)=>{
       if(!todo)
           {
               return res.status(404).send();
           }
           res.send({todo});
   },(err)=>{
    
       console.log("Unable to insert");
       
   }).catch((e)=>{
   res.status(404).send();
   });
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
   console.log(id);
  var body=_.pick(req.body,['text','completed']);
   if(!ObjectID.isValid(id)){
       return res.status(404).send();
   }
   console.log(body);
   if(_.isBoolean(body.completed)&&body.completed)
       {
           body.completedAt = new Date().getTime();
           console.log(body.completedAt);
       }else{
           body.completed = false;
           body.completedAt = null;
       }
   Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
       if(!todo)
           {
               return res.status(404).send();
           }
//            console.log(todo);
           res.send({todo});
       
   }).catch((e)=>{
      res.status(400).send(); 
   });
});


app.set('view engine','hbs');
// login page
app.get('/',(req,res)=>{
//res.render('login');
});
//insert data
app.post('/Login',(req,res)=>{
    
    var body=_.pick(req.body,['email','password']);

  var user= new User(body);
    user.save().then(
    ()=>{
//        if(!user){
//            return res.status(404).send("Unable to connect");
//        }
//         console.log("inside first then"+user.generateAuthToken());
        return user.generateAuthToken();
        }).then((token)=>{
        console.log(token);
      res.header('x-auth',token).send(user);
        // res.redirect('/');
    }).catch((e)=>{
     res.status(404).send("not found");
    });
    
    
});



app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    User.findByLogin(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
    

});

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    });
});









app.get('/users/me', authenticate, (req, res) => {

    res.send(req.user);
});







app.listen(port,()=>{
   console.log(`Started on port ${port}`); 
    
});


// var newTodo = new Todo({
//    text:'Cook dinner'
// });


// newTodo.save().then((doc)=>{
//    console.log('save todo',doc);
   
// },(e)=>{
//    console.log('unable to save todo');
// });
// var otherTodo = new Todo({
//     text: ' Feed the cat '
//     //completed:true,
//     //completedAt:123
// })
// otherTodo.save().then((doc)=>{
//    console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//    console.log('unable to save todo',e); 
// }); 








module.exports = {app}; 