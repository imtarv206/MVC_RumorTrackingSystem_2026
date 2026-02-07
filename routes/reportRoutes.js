const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// แสดงรายการรายงานทั้งหมด
router.get('/', reportController.index);

// แสดงฟอร์มสร้างรายงาน
router.get('/create', reportController.create);

// บันทึกรายงานใหม่
router.post('/', reportController.store);

// รายงานของผู้ใช้
router.get('/user/:userId', reportController.userReports);

module.exports = router;
