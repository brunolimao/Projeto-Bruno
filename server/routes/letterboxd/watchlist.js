const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const {spawn} = require("child_process")
const {convertData} = require('../../middlewares/letterboxd/watchlist')

router.post('/watchlist' , 
  async function(req,res,next) {
    const usersData = req.body;  // users, option
    console.log(usersData)
    users = usersData.users
    todo_mundo =usersData.option
      if (todo_mundo == 'on'){
        todo_mundo = true
      } else {
        todo_mundo = false
      }
    let python = spawn('python', ['C:/Users/Pichau/Documents/Projetos VSCode/Projeto-Bruno/server/routes/letterboxd/teste.py', users, todo_mundo])
    python.stdout.on('data', function(data){
      result = convertData(data.toString())
      console.log(result)
      res.send(result)
    })
    python.stderr.on('data', (data) => {
      console.log(data)
    });
  
    python.on('close', (code) => {
      console.log(code)
    });
  }
);


module.exports = router;