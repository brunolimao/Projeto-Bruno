const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());
const {spawn} = require("child_process")
const {convertData, executePythonScript} = require('../../middlewares/letterboxd/watchlist');

router.post('/tempo' , 
  async function(req,res,next) {
    const usersData = req.body;  // users, option
    let users = usersData.users

    try {
      const output = await executePythonScript('C:/Users/Pichau/Documents/Projetos VSCode/GitHub/Projeto-Bruno/server/routes/letterboxd/tempo.py',[users])
      const result = output.replaceAll("\r","").split("\n")
      res.send({tempo:result[0]})
    } catch (error) {
      console.error('Error executing Python script:', error);
      res.status(500).send('An error occurred while executing the Python script.');
    }
  }
);


router.post('/coleta' , 
  async function(req,res,next) {
    const usersData = req.body;  // users, option
    let users = usersData.users

    try {
      const output = await executePythonScript('C:/Users/Pichau/Documents/Projetos VSCode/GitHub/Projeto-Bruno/server/routes/letterboxd/coleta.py',[users])
      const result = output.replaceAll("\r","").split("\n")
      res.send(result[0])
    } catch (error) {
      console.error('Error executing Python script:', error);
      res.status(500).send('An error occurred while executing the Python script.');
    }

  }
);

router.post('/filmesEmComum' , 
  async function(req,res,next) {
    const usersData = req.body;  // users, option, filmes

    let users = usersData.users

    let filmes = usersData.filmes

    let todo_mundo = usersData.option
    if (todo_mundo == 'on'){
      todo_mundo = true
    } else {
      todo_mundo = false
    }
    
    filmes = filmes.replace("[","").replace("]","").replaceAll(" ","").replaceAll("'","")

    try {
      const output = await executePythonScript('C:/Users/Pichau/Documents/Projetos VSCode/GitHub/Projeto-Bruno/server/routes/letterboxd/filmesEmComum.py', [users, todo_mundo, filmes])
      const result = output.replaceAll("\r","").split("\n")
      res.send({message:result})
    } catch (error) {
      console.error('Error executing Python script:', error);
      res.status(500).send('An error occurred while executing the Python script.');
    }
  }
);

router.post('/final', async function (req, res, next) {
  const usersData = req.body;
  let filmes = usersData.filmes;
  filmes = filmes.replace("[", "").replace("]", "").replaceAll(" ", "").replaceAll("'", "");

  try {
    const output = await executePythonScript('C:/Users/Pichau/Documents/Projetos VSCode/GitHub/Projeto-Bruno/server/routes/letterboxd/final.py', [filmes]);
    const result = await convertData(output);
    res.send(result);
  } catch (error) {
    console.error('Error executing Python script:', error);
    res.status(500).send('An error occurred while executing the Python script.');
  }
});

module.exports = router;