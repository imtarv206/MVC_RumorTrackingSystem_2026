const ReportModel = require('../models/reportModel');
const RumorModel = require('../models/rumorModel');

const reportController = {
    // แสดงหน้ารายการรายงานทั้งหมด
    index: async (req, res) => {
        try {
            const reports = await ReportModel.getAllReports();
            res.render('reports/index', { reports, title: 'รายการรายงานทั้งหมด' });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // แสดงฟอร์มสร้างรายงาน
    create: async (req, res) => {
        try {
            const rumorId = req.query.rumor_id;
            let rumor = null;

            if (rumorId) {
                rumor = await RumorModel.getRumorById(rumorId);
            }

            // ดึงข่าวลือทั้งหมด
            const rumors = await RumorModel.getAllRumors();
            console.log('Total rumors:', rumors ? rumors.length : 0);

            res.render('reports/create', {
                layout: false,  // ปิด layout ชั่วคราวเพื่อ debug
                rumor: rumor || null,
                rumors: rumors || [],
                title: 'สร้างรายงานใหม่'
            });
        } catch (error) {
            console.error('Error in create:', error);
            res.status(500).send('เกิดข้อผิดพลาด: ' + error.message);
        }
    },

    // บันทึกรายงานใหม่
    store: async (req, res) => {
        try {
            const reportData = {
                reporter_id: req.body.reporter_id,
                rumour_id: req.body.rumour_id,
                report_type: req.body.report_type
            };

            await ReportModel.createReport(reportData);

            // ตรวจสอบและอัปเดตสถานะ panic
            await RumorModel.checkAndUpdatePanicStatus(reportData.rumour_id);

            res.redirect(`/rumors/${reportData.rumour_id}`);
        } catch (error) {
            console.error(error);
            if (error.message.includes('รายงาน')) {
                res.status(400).send(error.message);
            } else {
                res.status(500).send('เกิดข้อผิดพลาดในการสร้างรายงาน');
            }
        }
    },

    // รายงานของผู้ใช้
    userReports: async (req, res) => {
        try {
            const userId = req.params.userId;
            const reports = await ReportModel.getReportsByUserId(userId);
            res.render('reports/user', { reports, userId, title: 'รายงานของฉัน' });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    }
};

module.exports = reportController;
