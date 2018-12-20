const mongoose =require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt =require('bcryptjs');
var UserSchema = new mongoose.Schema({
		email:{
			type:String,
			required:true,
			trim:true,
			minlength:1,
			unique: true,
			validate:{
				validator:(value)=>validator.isEmail(value),
			message:'{value} is not a valid email'
		}
	},
	password:{
	type:String,
		require:true,
		minlength:6
},
tokens:[{access:{
	type:String,
	required:true

},token:{
	type:String,
	required:true
}}]
}

);
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.method('generateAuthToken',function(){

	var user = this;
//    console.log(user);
	var access ='auth';
	var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

	// console.log(user.tokens);

	// user.tokens.concat({access,token});
	console.log(" 2       " +user);
		user.tokens.push({access,token});
    return user.save().then(() => {
        return token;
    });

});
UserSchema.statics.findByLogin=function(email,password){
	var user = this;
	return user.findOne({email}).then((user)=>{
		if(!user)
		{
			return new Promise.reject();
		}

		return new Promise((resolve,reject)=>{
			bcrypt.compare(password,user.password,(err,res)=>{
				if(res){
						resolve(user);
				}else{
					reject();	
				}
			});
		});
	});

}

UserSchema.methods.removeToken=function(token){
	var user = this;
	return user.update({
		$pull:{
			tokens:{token}
		}
	});
};
UserSchema.statics.findByToken = function (token) {
    var user = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    }
    catch (e) {
        return Promise.reject(); 

    }


    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'

    });

};


UserSchema.pre('save',function(next){
	var user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(user.password,salt,(err,hash)=>{
				user.password=hash;
				next();
			});
		});
	}else{
		next();
	}

});

var User =mongoose.model('user',UserSchema);
module.exports={User};