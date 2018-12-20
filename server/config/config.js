var env = process.env.NODE_ENV || 'development';
console.log('env ********',env);
if(env=== 'development'){
    process.env.PORT=8000;
    process.env.MONGODB_URI='mongodb://localhost:27018/TodoApp';
    
}else if(env === 'test'){
     process.env.PORT=8000;
    process.env.MONGODB_URI='mongodb://localhost:27018/TodoAppTest';
} 