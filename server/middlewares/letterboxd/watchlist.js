require("dotenv").config()
const express = require("express")
const app = express()
app.use (express.json())



function convertData(data){
  result1 = data.split('\r\n')
  y=[]
  result = []
  for(let i = 0; i < result1.length - 1; i++){
    result.push(result1[i])
  }
  for(let i = 0; i < result.length; i++){
    valor = result[i].split(' | ')
    let filme = {
      "nome": valor[0],
      "nota": valor[1],
      "generos": valor[2],
      "link": valor[3],   
      "imagem": valor[4]     
    }
    y.push(filme)
  }
  teste = JSON.stringify(y)
  return teste
}

module.exports = {
  convertData,
};