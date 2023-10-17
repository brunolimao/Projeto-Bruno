require("dotenv").config()
const express = require("express")
const app = express()
app.use (express.json())
const {spawn} = require("child_process")

async function convertData(data) {
  return new Promise((resolve, reject) => {
    try {
      result1 = data.split('\r\n');
      y = [];
      result = [];

      for (let i = 0; i < result1.length - 1; i++) {
        result.push(result1[i]);
      }

      for (let i = 0; i < result.length; i++) {
        valor = result[i].split(' | ');
        let filme = {
          "nome": valor[0],
          "nota": valor[1],
          "generos": valor[2],
          "link": valor[3],
          "imagem": valor[4],
          "tempo": valor[5],
        };
        y.push(filme);
      }

      teste = JSON.stringify(y);
      resolve(teste);
    } catch (error) {
      reject(error);
    }
  });
}

async function executePythonScript(scriptPath, scriptArgs) {
  let scriptOutput = '';
  let scriptError = '';
  await new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [scriptPath, ...scriptArgs]);

    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      const errorMessage = data.toString();
      if (errorMessage.includes('Algum usuario com 0 filmes na watchlist.')) {
        reject("Algum usuario com 0 filmes na watchlist.")
      }
      if (errorMessage.includes('Nao existe filmes em comum na watchlist.')) {
        reject("Nao existe filmes em comum na watchlist.")
      }
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(scriptOutput);
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });

  return scriptOutput;
}

module.exports = {
  convertData, executePythonScript
};