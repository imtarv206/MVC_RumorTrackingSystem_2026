const db = require('../config/database.js');

const ReportModel = {
    // ดึงรายงานทั้งหมด
    getAllReports: async () => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       u.FName, u.LName,
                       rum.Rumour_Title
                FROM Report r
                JOIN User u ON r.Reporter_ID = u.User_ID
                JOIN Rumour rum ON r.Rumour_ID = rum.Rumour_ID
                ORDER BY r.Report_Date DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ดึงรายงานตาม Rumour ID
    getReportsByRumorId: async (rumorId) => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       u.FName, u.LName, u.Role
                FROM Report r
                JOIN User u ON r.Reporter_ID = u.User_ID
                WHERE r.Rumour_ID = ?
                ORDER BY r.Report_Date DESC
            `, [rumorId]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ดึงรายงานตาม User ID
    getReportsByUserId: async (userId) => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       rum.Rumour_Title, rum.Status
                FROM Report r
                JOIN Rumour rum ON r.Rumour_ID = rum.Rumour_ID
                WHERE r.Reporter_ID = ?
                ORDER BY r.Report_Date DESC
            `, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // สร้างรายงานใหม่
    createReport: async (reportData) => {
        try {
            const { reporter_id, rumour_id, report_type } = reportData;

            // ตรวจสอบว่าข่าวลือถูก verify แล้วหรือยัง
            const [rumorCheck] = await db.query(
                'SELECT Is_Verified FROM Rumour WHERE Rumour_ID = ?',
                [rumour_id]
            );

            if (rumorCheck[0]?.Is_Verified) {
                throw new Error('ข่าวลือนี้ถูกตรวจสอบแล้ว ไม่สามารถรายงานเพิ่มได้');
            }

            // ตรวจสอบว่าผู้ใช้รายงานข่าวลือนี้ไปแล้วหรือยัง
            const [existingReport] = await db.query(`
                SELECT * FROM Report
                WHERE Reporter_ID = ? AND Rumour_ID = ?
            `, [reporter_id, rumour_id]);

            if (existingReport.length > 0) {
                throw new Error('คุณได้รายงานข่าวลือนี้ไปแล้ว');
            }

            // สร้างรายงาน
            const [result] = await db.query(`
                INSERT INTO Report (Reporter_ID, Rumour_ID, Report_Type)
                VALUES (?, ?, ?)
            `, [reporter_id, rumour_id, report_type]);

            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    // ลบรายงาน
    deleteReport: async (reportId) => {
        try {
            const [result] = await db.query('DELETE FROM Report WHERE Report_ID = ?', [reportId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // นับจำนวนรายงานตามประเภท
    getReportTypeCount: async (rumorId) => {
        try {
            const [rows] = await db.query(`
                SELECT Report_Type, COUNT(*) as count
                FROM Report
                WHERE Rumour_ID = ?
                GROUP BY Report_Type
            `, [rumorId]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ตรวจสอบว่าผู้ใช้รายงานข่าวลือนี้แล้วหรือยัง
    hasUserReported: async (userId, rumorId) => {
        try {
            const [rows] = await db.query(`
                SELECT COUNT(*) as count
                FROM Report
                WHERE Reporter_ID = ? AND Rumour_ID = ?
            `, [userId, rumorId]);
            return rows[0].count > 0;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ReportModel;
