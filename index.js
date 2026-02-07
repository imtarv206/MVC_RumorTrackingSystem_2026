const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/database');

// Import routes
const indexRoutes = require('./routes/index');
const rumorRoutes = require('./routes/rumorRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Routes
app.use('/', indexRoutes);
app.use('/rumors', rumorRoutes);
app.use('/reports', reportRoutes);
app.use('/users', userRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).send('หน้าที่คุณค้นหาไม่พบ');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('เกิดข้อผิดพลาดบางอย่าง!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

