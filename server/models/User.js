const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

// 몽고스에서 가져온 메서드
// 저장하기 전에 
userSchema.pre('save',function(next){
    //현재 user 객체
    let user = this;
    
    //패스워드를 바꿀 때만 
    if(user.isModified('password')){
    //비밀번호 암호화 
        //솔트 생성
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password , salt ,function(err,hash){
                if(err) return next(err);

                //해쉬로 변경된 패스워드로 바꿈
                user.password = hash;
                
                next()
            });
        });
    }else{
        next()
    }
 
})

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err)return cb(err);
            cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token 생성
    let user = this;
    let token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err,userInfo){
        if(err) return cb(err)
        cb(null,userInfo)
    })

}

userSchema.statics.findByToken = function(token,cb){
    let user = this;

    //토큰을 decode한다.
    jwt.verify(token,'secretToken',function(err,decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded , "token":token}, function(err ,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}
const User=mongoose.model('User',userSchema);

// 다른 폴더에서 모델을 사용할 수 있게 하려면 아래처럼
module.exports={User};