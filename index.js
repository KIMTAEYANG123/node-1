const express = require('express')
const app = express()

// 포트는자기가하고싶은거해도됨
const port = 5000
const bodyParser = require('body-parser');
const config = require('./config/key')
const {User} = require("./models/User");

//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있음 
app.use(bodyParser.urlencoded({extended:true}));

//json을 분석해서 가져올 수 있게
app.use(bodyParser.json());

const mongoose=require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('연결됬다.'))
.catch(err=>console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! 노드몬 사용니?')
})

app.post('/register',(req,res)=>{
  //회원가입 할 때 필요한 정보들을 client에서 가져오면 디비에 넣어준다.

  //바디팔서를 이용해서 이렇게 가능
  // req.body안에는 회원가입에 정보들이 들어있음
  const user = new User(req.body);

  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})