const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());


router.get('/welcome' , 
	async function(req , res , next){
		const name = req.user.id;
		res.status(200).json({name});
	}
);

module.exports = router;