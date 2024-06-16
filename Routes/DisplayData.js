const express = require('express')
const router = express.Router()

router.post('/streamData',(req,res) =>{
    try {
        res.send([global.stream, global.category])
    } catch (error) {
        console.log(error.message);
        res.send("server error");
    }
})

module.exports = router;