const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({
    extended: false,
  }));



// Routers
const userRouter = require('./routes/Users');
app.use("/users" , userRouter);

const letterboxdRouter = require('./routes/letterboxd/watchlist');
app.use("/letterboxd" , letterboxdRouter);

app.listen(3001, () => {
    console.log("Server started on port 3001 : http://localhost:3001");
});
