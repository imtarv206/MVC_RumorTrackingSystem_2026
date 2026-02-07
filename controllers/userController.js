const UserModel = require('../models/userModel');

const userController = {
    // แสดงหน้ารายการผู้ใช้ทั้งหมด
    index: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.render('users/index', { users, title: 'รายการผู้ใช้งาน' });
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // แสดงหน้า login
    loginPage: (req, res) => {
        res.render('users/login', { title: 'เข้าสู่ระบบ' });
    },

    // ประมวลผล login
    login: async (req, res) => {
        try {
            const { user_id, password } = req.body;
            const user = await UserModel.login(user_id, password);

            if (user) {
                // เก็บข้อมูลผู้ใช้ใน session (ในตัวอย่างนี้ใช้แบบง่าย)
                req.session = req.session || {};
                req.session.user = user;
                res.redirect('/');
            } else {
                res.send('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาด');
        }
    },

    // แสดงฟอร์มสร้างผู้ใช้ใหม่
    create: (req, res) => {
        res.render('users/create', { title: 'สร้างผู้ใช้ใหม่' });
    },

    // บันทึกผู้ใช้ใหม่
    store: async (req, res) => {
        try {
            const userData = {
                password: req.body.password,
                fname: req.body.fname,
                lname: req.body.lname,
                role: req.body.role
            };

            await UserModel.createUser(userData);
            res.redirect('/users');
        } catch (error) {
            console.error(error);
            res.status(500).send('เกิดข้อผิดพลาดในการสร้างผู้ใช้');
        }
    }
};

module.exports = userController;
