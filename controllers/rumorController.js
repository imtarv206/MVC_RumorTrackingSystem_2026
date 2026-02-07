const RumorModel = require('../models/rumorModel');
const ReportModel = require('../models/reportModel');

const rumorController = {
    // แสดงหน้ารายการข่าวลือทั้งหมด
    index: async (req, res) => {
        try {
            const rumors = await RumorModel.getAllRumors();
            res.render('rumors/index', { rumors, title: 'รายการข่าวลือทั้งหมด' });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // แสดงหน้ารายละเอียดข่าวลือ
    show: async (req, res) => {
        try {
            const rumorId = req.params.id;
            const rumor = await RumorModel.getRumorById(rumorId);
            const reports = await ReportModel.getReportsByRumorId(rumorId);
            const reportTypes = await ReportModel.getReportTypeCount(rumorId);

            if (!rumor) {
                return res.status(404).send('ไม่พบข่าวลือ');
            }

            res.render('rumors/show', {
                rumor,
                reports,
                reportTypes,
                title: 'รายละเอียดข่าวลือ'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // แสดงฟอร์มสร้างข่าวลือใหม่
    create: (req, res) => {
        res.render('rumors/create', { title: 'สร้างข่าวลือใหม่' });
    },

    // บันทึกข่าวลือใหม่
    store: async (req, res) => {
        try {
            const rumorData = {
                rumour_title: req.body.rumour_title,
                source: req.body.source,
                credibility_score: req.body.credibility_score
            };

            await RumorModel.createRumor(rumorData);
            res.redirect('/rumors');
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาดในการสร้างข่าวลือ');
        }
    },

    // แสดงข่าวลือสถานะ panic
    panic: async (req, res) => {
        try {
            const rumors = await RumorModel.getPanicRumors();
            res.render('rumors/panic', { rumors, title: 'ข่าวลือสถานะ Panic' });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // ตรวจสอบข่าวลือ (สำหรับ Checker)
    verify: async (req, res) => {
        try {
            const rumorId = req.params.id;
            await RumorModel.verifyRumor(rumorId);
            res.redirect(`/rumors/${rumorId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // สรุปผล (Dashboard)
    summary: async (req, res) => {
        try {
            const allRumors = await RumorModel.getAllRumors();
            const panicRumors = await RumorModel.getPanicRumors();
            const normalRumors = await RumorModel.getNormalRumors();

            res.render('rumors/summary', {
                allRumors,
                panicRumors,
                normalRumors,
                title: 'สรุปผลข่าวลือ'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    }
};

module.exports = rumorController;
