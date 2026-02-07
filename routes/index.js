const express = require('express');
const router = express.Router();

// หน้าแรก (Dashboard)
router.get('/', (req, res) => {
    res.redirect('/rumors/summary');
});

module.exports = router;
