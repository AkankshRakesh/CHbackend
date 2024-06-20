const express = require('express');
const router = express.Router();
const Order = require('../models/Carreers');

router.post('/CareerData', async (req, res) => {
    let data = req.body.career_data;
    
    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'career_data should be an array' });
    }

    await data.splice(0, 0, { Career_date: req.body.career_date });

    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);
        if (eId === null) {
            try {
                console.log(data);
                console.log(req.body.email);

                await Order.create({
                    email: req.body.email,
                    career_data:[data]
                });

                return res.json({ success: true });
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        } else {
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { career_data: data } } ).then(() => {
                        res.json({success : true})
                    })
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email })
        res.json({careerData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
});
module.exports = router;
