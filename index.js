const express = require('express')
const app = express()

// 포트는자기가하고싶은거해도됨
const port = 5000


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://user:asdf1234@taeyang.dw9ha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('연결됬다.'))
.catch(err=>console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})