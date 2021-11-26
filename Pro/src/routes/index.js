const express = require('express');
const router = express.Router();
//para renserizar la vista
router.get('/', async (req, res) => {
    res.render('index');
});

module.exports = router;