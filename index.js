const express = require('express')
const app = express()

// 포트는자기가하고싶은거해도됨
const port = 5000
const bodyParser = require('body-parser');
const config = require('./server/config/key')
const {User} = require("./server/models/User");
const cookieParser = require('cookie-parser');
const {auth} = require('./server/middleware/auth');

//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있음 
app.use(bodyParser.urlencoded({extended:true}));

//json을 분석해서 가져올 수 있게
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose=require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('연결됬다.'))
.catch(err=>console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! 노드몬 사용니?')
})

app.post('/api/users/register',(req,res)=>{
  //회원가입 할 때 필요한 정보들을 client에서 가져오면 디비에 넣어준다.

  //바디팔서를 이용해서 이렇게 가능
  // req.body안에는 회원가입에 정보들이 들어있음
  const user = new User(req.body);

  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true,
      info:userInfo
    });
  });
});

app.get('/api/hello', (req,res)=> res.send('hello world ~'))

app.post('/api/users/login',(req,res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email:req.body.email}, (err,userInfo)=>{
    if(!userInfo){
      return res.json({
        loginSucess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }
  //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    userInfo.comparePassword(req.body.password, (err,isMatch)=>{
      if(!isMatch)
      return res.json({loginSucess:false,message:"비밀번호가 틀렸습니다."})


      //비밀번호까지 맞다면 토큰을 생성하기
      userInfo.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에 ? 쿠키 ,로컬스토리지 등에 저장할 수 있음
        res.cookie('x_auth',user.token)
        .status(200)
        .json({loginSuccess:true, userId: user._id}) 
      });
    });
  });
});

app.get('/api/users/auth',auth,(req,res)=>{
  res.status(200).json({
    _id : req.user._id,
    isAdmin: req.user.role === 0 ? false:true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image:req.user.image
  })
})

app.get('/api/users/logout',auth , (req,res)=>{
    User.findOneAndUpdate({_id: req.user._id}, {token: ""},(err,user)=>{
      if (err) return res.json({success:false,err})
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

