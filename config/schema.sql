CREATE DATABASE IF NOT EXISTS rumor_tracking_db;
USE rumor_tracking_db;

-- ตาราง User (ผู้ใช้งาน)
CREATE TABLE User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Password VARCHAR(255) NOT NULL,
    FName VARCHAR(100) NOT NULL,
    LName VARCHAR(100) NOT NULL,
    Role ENUM('User', 'Checker') NOT NULL DEFAULT 'User'
);

-- ตาราง Rumour (ข่าวลือ)
CREATE TABLE Rumour (
    Rumour_ID INT AUTO_INCREMENT PRIMARY KEY,
    Rumour_Title VARCHAR(255) NOT NULL,
    Source VARCHAR(255) NOT NULL,
    Create_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Credibility_score DECIMAL(3,2) DEFAULT 0.00,
    Status ENUM('normal', 'panic') NOT NULL DEFAULT 'normal',
    Is_Verified BOOLEAN DEFAULT FALSE COMMENT 'ถ้าตรวจสอบแล้วจะไม่สามารถรายงานเพิ่มได้'
);

-- ตาราง Report (การรายงาน)
CREATE TABLE Report (
    Report_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reporter_ID INT NOT NULL,
    Rumour_ID INT NOT NULL,
    Report_Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Report_Type ENUM('Distortion', 'Inciting', 'False Information') NOT NULL,
    FOREIGN KEY (Reporter_ID) REFERENCES User(User_ID) ON DELETE CASCADE,
    FOREIGN KEY (Rumour_ID) REFERENCES Rumour(Rumour_ID) ON DELETE CASCADE,
    UNIQUE KEY unique_report (Reporter_ID, Rumour_ID) COMMENT 'ผู้ใช้หนึ่งคนรายงานข่าวลือเดียวกันซ้ำไม่ได้'
);

