const db = require('../config/database.js');

const UserModel = {
    // ดึงผู้ใช้ทั้งหมด
    getAllUsers: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM User ORDER BY User_ID');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ดึงผู้ใช้ตาม ID
    getUserById: async (id) => {
        try {
            const [rows] = await db.query('SELECT * FROM User WHERE User_ID = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    // สร้างผู้ใช้ใหม่
    createUser: async (userData) => {
        try {
            const { password, fname, lname, role } = userData;
            const [result] = await db.query(`
                INSERT INTO User (Password, FName, LName, Role)
                VALUES (?, ?, ?, ?)
            `, [password, fname, lname, role || 'User']);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },

    // อัปเดตข้อมูลผู้ใช้
    updateUser: async (id, userData) => {
        try {
            const { password, fname, lname, role } = userData;
            const [result] = await db.query(`
                UPDATE User
                SET Password = ?, FName = ?, LName = ?, Role = ?
                WHERE User_ID = ?
            `, [password, fname, lname, role, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // ลบผู้ใช้
    deleteUser: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM User WHERE User_ID = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    },

    // ดึงผู้ใช้ตาม Role
    getUsersByRole: async (role) => {
        try {
            const [rows] = await db.query('SELECT * FROM User WHERE Role = ?', [role]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // ตรวจสอบ login (ตัวอย่างเบื้องต้น - ควรใช้ bcrypt สำหรับ production)
    login: async (userId, password) => {
        try {
            const [rows] = await db.query(`
                SELECT * FROM User
                WHERE User_ID = ? AND Password = ?
            `, [userId, password]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserModel;
