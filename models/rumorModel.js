const db = require('../config/database.js');

// กำหนดจำนวนรายงานขั้นต่ำที่จะทำให้สถานะเปลี่ยนเป็น panic
const PANIC_THRESHOLD = 5;

const RumorModel = {
    // ดึงข่าวลือทั้งหมด
    getAllRumors: async () => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       COUNT(rep.Report_ID) as report_count
                FROM Rumour r
                LEFT JOIN Report rep ON r.Rumour_ID = rep.Rumour_ID
                GROUP BY r.Rumour_ID
                ORDER BY r.Create_Date DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ดึงข่าวลือตาม ID พร้อมจำนวนรายงาน
    getRumorById: async (id) => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       COUNT(rep.Report_ID) as report_count
                FROM Rumour r
                LEFT JOIN Report rep ON r.Rumour_ID = rep.Rumour_ID
                WHERE r.Rumour_ID = ?
                GROUP BY r.Rumour_ID
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // สร้างข่าวลือใหม่
    createRumor: async (rumorData) => {
        try {
            const { rumour_title, source, credibility_score } = rumorData;
            const [result] = await db.query(`
                INSERT INTO Rumour (Rumour_Title, Source, Credibility_score)
                VALUES (?, ?, ?)
            `, [rumour_title, source, credibility_score || 0.00]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    // อัปเดตสถานะข่าวลือ
    updateRumorStatus: async (id, status) => {
        try {
            const [result] = await db.query(`
                UPDATE Rumour
                SET Status = ?
                WHERE Rumour_ID = ?
            `, [status, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // อัปเดต Credibility Score
    updateCredibilityScore: async (id, score) => {
        try {
            const [result] = await db.query(`
                UPDATE Rumour
                SET Credibility_score = ?
                WHERE Rumour_ID = ?
            `, [score, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // นับจำนวนรายงานของข่าวลือ
    getReportCount: async (rumorId) => {
        try {
            const [rows] = await db.query(`
                SELECT COUNT(*) as count
                FROM Report
                WHERE Rumour_ID = ?
            `, [rumorId]);
            return rows[0].count;
        } catch (error) {
            throw error;
        }
    },

    // ตรวจสอบและอัปเดตสถานะ panic ตามจำนวนรายงาน
    checkAndUpdatePanicStatus: async (rumorId) => {
        try {
            const reportCount = await RumorModel.getReportCount(rumorId);

            // ถ้าจำนวนรายงานเกินหรือเท่ากับ threshold ให้เปลี่ยนเป็น panic
            if (reportCount >= PANIC_THRESHOLD) {
                await RumorModel.updateRumorStatus(rumorId, 'panic');
                return { status: 'panic', reportCount };
            }

            return { status: 'normal', reportCount };
        } catch (error) {
            throw error;
        }
    },

    // ทำเครื่องหมายว่าข่าวลือถูกตรวจสอบแล้ว (จะไม่สามารถรายงานเพิ่มได้)
    verifyRumor: async (id) => {
        try {
            const [result] = await db.query(`
                UPDATE Rumour
                SET Is_Verified = TRUE
                WHERE Rumour_ID = ?
            `, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // ตรวจสอบว่าข่าวลือถูก verify แล้วหรือยัง
    isRumorVerified: async (rumorId) => {
        try {
            const [rows] = await db.query(`
                SELECT Is_Verified
                FROM Rumour
                WHERE Rumour_ID = ?
            `, [rumorId]);
            return rows[0]?.Is_Verified || false;
        } catch (error) {
            throw error;
        }
    },

    // ดึงข่าวลือที่มีสถานะ panic
    getPanicRumors: async () => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       COUNT(rep.Report_ID) as report_count
                FROM Rumour r
                LEFT JOIN Report rep ON r.Rumour_ID = rep.Rumour_ID
                WHERE r.Status = 'panic'
                GROUP BY r.Rumour_ID
                ORDER BY r.Create_Date DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ดึงข่าวลือที่มีสถานะ normal
    getNormalRumors: async () => {
        try {
            const [rows] = await db.query(`
                SELECT r.*,
                       COUNT(rep.Report_ID) as report_count
                FROM Rumour r
                LEFT JOIN Report rep ON r.Rumour_ID = rep.Rumour_ID
                WHERE r.Status = 'normal'
                GROUP BY r.Rumour_ID
                ORDER BY r.Create_Date DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ลบข่าวลือ
    deleteRumor: async (id) => {
        try {
            const [result] = await db.query(`
                DELETE FROM Rumour
                WHERE Rumour_ID = ?
            `, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = RumorModel;
