-- ข้อมูลเริ่มต้นสำหรับระบบติดตามข่าวลือ
USE rumor_tracking_db;

-- เพิ่มผู้ใช้งาน (≥10 คน)
INSERT INTO User (Password, FName, LName, Role) VALUES
('password123', 'สมชาย', 'ใจดี', 'User'),
('password124', 'สมหญิง', 'รักษ์ดี', 'User'),
('password125', 'วิชัย', 'มั่นคง', 'Checker'),
('password126', 'นภา', 'สว่างใจ', 'User'),
('password127', 'ประยุทธ', 'เจริญ', 'User'),
('password721', 'สุดา', 'แสงจันทร์', 'Checker'),
('password731', 'อนุชา', 'พัฒนา', 'User'),
('password741', 'มาลี', 'ดอกไม้', 'User'),
('password751', 'ธนา', 'รุ่งเรือง', 'User'),
('password761', 'ปิยะ', 'สุขสันต์', 'User'),
('password167', 'วรรณา', 'เมืองทอง', 'User'),
('password176', 'ศักดิ์', 'ชัยชนะ', 'Checker');

-- เพิ่มข่าวลือ (≥8 ข่าว) - มีทั้งสถานะ normal และ panic
INSERT INTO Rumour (Rumour_Title, Source, Create_Date, Credibility_score, Status, Is_Verified) VALUES
('พบเงินปลอมแพร่หลายในตลาดนัด', 'Facebook', '2026-01-15 10:30:00', 0.45, 'panic', FALSE),
('ราคาน้ำมันจะขึ้นอีก 10 บาท', 'LINE Group', '2026-01-20 14:20:00', 0.30, 'normal', FALSE),
('ร้านอาหารใกล้มหาวิทยาลัยมีเชื้อโรค', 'Twitter', '2026-01-22 09:15:00', 0.60, 'panic', FALSE),
('รัฐบาลจะแจกเงินให้ประชาชนอีกรอบ', 'TikTok', '2026-01-25 16:45:00', 0.25, 'normal', FALSE),
('สินค้าในห้างจะลดราคา 90% วันนี้', 'Facebook', '2026-01-28 11:00:00', 0.20, 'normal', TRUE),
('พบงูเห่าในห้องน้ำหอพัก', 'Instagram', '2026-02-01 08:30:00', 0.75, 'panic', FALSE),
('มีการโจรกรรมบ้านในหมู่บ้านทุกคืน', 'Pantip', '2026-02-03 19:20:00', 0.55, 'normal', FALSE),
('พนักงานร้านสะดวกซื้อขโมยเงินลูกค้า', 'LINE Group', '2026-02-05 13:40:00', 0.40, 'normal', FALSE),
('มีการจ่ายเงินค่าไฟฟ้าผิดปกติเพิ่มขึ้น 300%', 'Facebook', '2026-02-06 15:10:00', 0.35, 'panic', FALSE),
('โรงเรียนจะปิดเทอมก่อนกำหนด 1 เดือน', 'Twitter', '2026-02-07 07:50:00', 0.50, 'normal', FALSE);

-- เพิ่มรายงาน (Report) - จำลองสถานการณ์ที่ข่าวลือบางข่าวถูกรายงานมาก
-- ข่าวลือ ID 1: 6 รายงาน (เข้าสู่ panic)
INSERT INTO Report (Reporter_ID, Rumour_ID, Report_Date, Report_Type) VALUES
(1, 1, '2026-01-15 11:00:00', 'False Information'),
(2, 1, '2026-01-15 12:30:00', 'False Information'),
(4, 1, '2026-01-15 14:15:00', 'Inciting'),
(5, 1, '2026-01-16 09:20:00', 'Distortion'),
(7, 1, '2026-01-16 10:45:00', 'False Information'),
(8, 1, '2026-01-16 16:30:00', 'Inciting');

-- ข่าวลือ ID 3: 7 รายงาน (เข้าสู่ panic)
INSERT INTO Report (Reporter_ID, Rumour_ID, Report_Date, Report_Type) VALUES
(1, 3, '2026-01-22 10:00:00', 'False Information'),
(2, 3, '2026-01-22 11:20:00', 'Inciting'),
(4, 3, '2026-01-22 13:40:00', 'False Information'),
(5, 3, '2026-01-23 08:15:00', 'Distortion'),
(7, 3, '2026-01-23 09:30:00', 'False Information'),
(9, 3, '2026-01-23 14:20:00', 'Inciting'),
(10, 3, '2026-01-23 16:45:00', 'False Information');

-- ข่าวลือ ID 6: 8 รายงาน (เข้าสู่ panic)
INSERT INTO Report (Reporter_ID, Rumour_ID, Report_Date, Report_Type) VALUES
(1, 6, '2026-02-01 09:00:00', 'False Information'),
(2, 6, '2026-02-01 09:30:00', 'Inciting'),
(4, 6, '2026-02-01 10:15:00', 'False Information'),
(5, 6, '2026-02-01 11:40:00', 'Distortion'),
(7, 6, '2026-02-01 13:20:00', 'False Information'),
(8, 6, '2026-02-01 14:50:00', 'Inciting'),
(9, 6, '2026-02-01 15:30:00', 'False Information'),
(11, 6, '2026-02-01 16:00:00', 'Distortion');

-- ข่าวลือ ID 9: 6 รายงาน (เข้าสู่ panic)
INSERT INTO Report (Reporter_ID, Rumour_ID, Report_Date, Report_Type) VALUES
(2, 9, '2026-02-06 16:00:00', 'False Information'),
(4, 9, '2026-02-06 17:20:00', 'Inciting'),
(5, 9, '2026-02-06 18:15:00', 'False Information'),
(7, 9, '2026-02-06 19:30:00', 'Distortion'),
(8, 9, '2026-02-06 20:10:00', 'False Information'),
(10, 9, '2026-02-06 21:00:00', 'Inciting');

-- ข่าวลืออื่นๆ มีรายงานน้อยกว่า (ยังคงเป็น normal)
INSERT INTO Report (Reporter_ID, Rumour_ID, Report_Date, Report_Type) VALUES
(1, 2, '2026-01-20 15:00:00', 'Distortion'),
(2, 2, '2026-01-20 16:30:00', 'False Information'),
(4, 4, '2026-01-25 17:00:00', 'Inciting'),
(5, 4, '2026-01-25 18:20:00', 'False Information'),
(1, 7, '2026-02-03 20:00:00', 'False Information'),
(2, 7, '2026-02-04 08:30:00', 'Inciting'),
(4, 7, '2026-02-04 10:15:00', 'Distortion'),
(1, 8, '2026-02-05 14:00:00', 'False Information'),
(5, 8, '2026-02-05 15:30:00', 'Distortion'),
(7, 10, '2026-02-07 08:30:00', 'Inciting'),
(8, 10, '2026-02-07 09:45:00', 'False Information');
