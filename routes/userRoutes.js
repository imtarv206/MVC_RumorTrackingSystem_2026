const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// แสดงรายการผู้ใช้ทั้งหมด
router.get('/', userController.index);

// หน้า login
router.get('/login', userController.loginPage);

// ประมวลผล login
router.post('/login', userController.login);

// แสดงฟอร์มสร้างผู้ใช้ใหม่
router.get('/create', userController.create);

// บันทึกผู้ใช้ใหม่
router.post('/', userController.store);

module.exports = router;
