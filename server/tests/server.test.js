const expect = require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');
const {app} =require('./../server');
const {Todo} =require('./../models/todo');
const todos = [{
    _id:new ObjectID(),
    text:"First test todo"
},
{
    _id:new ObjectID(),
    text:"Second test todo",
    completed:true,
    completedAt:333
}];
beforeEach((done)=>{
    done.timeout(15000);
   Todo.remove({}).then(()=>{
       Todo.insertMany(todos);
       done();
   }).then(()=>{done()}).catch((e)=>done());
});
describe('POST /todos',()=>{
   it('should create a new todo',(done)=>{
       var text = 'Test todo text';
   
   request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res)=>{
       expect(res.body.text).toBe(text);
       
       })
       .end((err,res)=>{
       if(err){
           return done(err);
       }
       Todo.find({text}).then((todos)=>{
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
       }).catch((e)=>done(e));
   })
   });

    
    
    // should only create avlid todo
    
    it("should not create a invalid todo with invalid todo data",(done)=>{
       
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
                Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
//                expect(todos[0].text).toBe(text);
                done();
                }).catch((e)=>done(e));
        });
        
    });
    
});


describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
       request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
    })
    .end(done);
    });
});




describe('Get/todos/:id',()=>{
   it("should return todo doc",(done)=>{
     console.log(todos[0]._id.toHexString());
       request(app)
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res)=>{
         expect(res.body.todo.text).toBe(todos[0].text);
     })
       .end(done);
   });
});


describe("Delete /todos/:id", ()=>{
    it("Should remove a todo",(done)=>{
        var hexId= todos[1]._id.toHexString();
        console.log(hexId);
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
        }).end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch((e)=>done(e));
        });
    });
    
    it("shuld return 404 if todo not found",(done)=>{
       var hexId=new ObjectID().toHexString();
        
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    
    it("shuld return 404 if object id is invalid",(done)=>{
         request(app)
        .delete(`/todos/123abc`)
        .expect(404) 
        .end(done);
    });
});





describe("patch /todo/:id",()=>{
    it('should update a new todo',(done)=>{
    var hexId= todos[0]._id.toHexString();
    var text="updated using server.test.js";
        request(app)
        .patch(`/todos/${hexId}`)
        .send({completed:true,
              text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        }).end(done);

        
    });
    it('should clearcompletedAt when todo is not completed',(done)=>{
    var hexId= todos[1]._id.toHexString();
    var text="updated using server.test.js!!";
        request(app)
        .patch(`/todos/${hexId}`)
        .send({completed:false,
              text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        }).end(done);

        
    });
})