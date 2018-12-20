const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = '123abc!';

bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(password,salt,(err,hash)=>{

    console.log(hash);
});
});

var hashpas="$2a$10$c0qp/Pq0Wtg7stxxTCjUXenUJsnobhJLZ9pkpGG6FAt72C3OJIG/y";

bcrypt.compare(password, hashpas, ( err, res ) => {
    
console.log(res);
});


// var data = {
//     id:10
// };

// var token = jwt.sign(data,'123abc');
// var decrypt = jwt.verify(token,'123abc');
// console.log(decrypt);
// //jwt.verify
// var hashing1=(value)=>{

// var hash = SHA256(value).toString();

//     return hash;
// };

  
/*
var data ={
    id:4
};  

var token = {
    data,
    hash:SHA256(JSON.stringify(data)+'somesecret').toString() 
}

var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
if(resultHash === token.hash)
    {
        console.log('Data was not changed');
    }
else
{
    console.log('Data was changed. Do not trust');
}
*/

// module.exports.hashing1=hashing1;



