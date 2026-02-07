const express = require('express');
const router = express.Router();
const rumorController = require('../controllers/rumorController');

// แสดงรายการข่าวลือทั้งหมด
router.get('/', rumorController.index);

// แสดงหน้าสรุปผล
router.get('/summary', rumorController.summary);

// แสดงข่าวลือ panic
router.get('/panic', rumorController.panic);

// แสดงฟอร์มสร้างข่าวลือใหม่
router.get('/create', rumorController.create);

// บันทึกข่าวลือใหม่
router.post('/', rumorController.store);

// แสดงรายละเอียดข่าวลือ
router.get('/:id', rumorController.show);

// ตรวจสอบข่าวลือ (Verify)
router.post('/:id/verify', rumorController.verify);

module.exports = router;
