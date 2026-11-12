CREATE DATABASE IF NOT EXISTS carecoimbatore;
USE carecoimbatore;

CREATE TABLE IF NOT EXISTS hospitals (
  hospital_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address VARCHAR(255),
  region ENUM('Coimbatore','Tiruppur','Palladam') NOT NULL,
  district VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  pincode VARCHAR(6),
  category ENUM('Government','Private','Trust'),
  hospital_type ENUM('Multi-speciality','General','Specialty','Medical College Hospital','Clinic'),
  contact_number VARCHAR(20),
  email VARCHAR(100),
  appointment_available BOOLEAN DEFAULT TRUE,
  operating_hours VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  UNIQUE KEY uq_hospital (name, region)
);

CREATE TABLE IF NOT EXISTS departments (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS hospital_departments (
  hospital_id INT NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (hospital_id, department_id),
  FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE IF NOT EXISTS doctors (
  doctor_id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_id INT NOT NULL,
  department_id INT,
  name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

INSERT IGNORE INTO hospitals
(name, address, region, district, city, pincode, category, hospital_type) VALUES
-- COIMBATORE
('Coimbatore Medical College Hospital (CMCH)','Trichy Road, Gopalapuram','Coimbatore','Coimbatore','Coimbatore','641018','Government','Medical College Hospital'),
('PSG Hospitals','Peelamedu','Coimbatore','Coimbatore','Coimbatore','641004',NULL,NULL),
('Sri Ramakrishna Hospital','395, Sarojini Naidu Road, Sidhapudur','Coimbatore','Coimbatore','Coimbatore','641044',NULL,NULL),
('Kovai Medical Center and Hospital (KMCH)','Avinashi Road, Civil Aerodrome Post','Coimbatore','Coimbatore','Coimbatore','641014',NULL,NULL),
('KG Hospital','5, Government Arts College Road','Coimbatore','Coimbatore','Coimbatore','641018',NULL,NULL),
('Ganga Hospital','313, Mettupalayam Road','Coimbatore','Coimbatore','Coimbatore','641043',NULL,NULL),
('Royal Care Super Speciality Hospital','Neelambur','Coimbatore','Coimbatore','Coimbatore','641062',NULL,NULL),
('Aravind Eye Hospital','Avinashi Road, Peelamedu','Coimbatore','Coimbatore','Coimbatore','641014',NULL,NULL),
('Government Medical College and ESI Hospital','Singanallur','Coimbatore','Coimbatore','Coimbatore',NULL,'Government','Medical College Hospital'),
('Shanthi Social Services (SSS) Medical Centre','128/1, Trichy Road, Singanallur','Coimbatore','Coimbatore','Coimbatore','641005',NULL,NULL),
('Karpagam Faculty of Medical Sciences and Research','Othakkalmandapam','Coimbatore','Coimbatore','Coimbatore','641032',NULL,NULL),
('KMCH Institute of Health Sciences and Research',NULL,'Coimbatore','Coimbatore','Coimbatore',NULL,NULL,NULL),
-- TIRUPPUR
('Government Medical College Hospital, Tiruppur','Dharapuram Road','Tiruppur','Tiruppur','Tiruppur',NULL,'Government','Medical College Hospital'),
('Revathi Medical Center',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('AMC Super Speciality Hospital',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('Kumaran Hospital',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('Velan Hospital',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('ESIC Hospital, Tiruppur',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('Government Headquarters Hospital, Tiruppur',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,'Government',NULL),
('B.M. Ortho Hospital',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('Jeya Priya Hospital',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
('Viva Hospital',NULL,'Tiruppur','Tiruppur','Tiruppur',NULL,NULL,NULL),
-- PALLADAM
('Government Hospital, Palladam',NULL,'Palladam','Tiruppur','Palladam','641664','Government',NULL),
('Ponni Hospital',NULL,'Palladam','Tiruppur','Palladam',NULL,NULL,NULL),
('Sri Balaji Hospital',NULL,'Palladam','Tiruppur','Palladam',NULL,NULL,NULL),
('Rajeswari Nursing Home',NULL,'Palladam','Tiruppur','Palladam',NULL,NULL,NULL),
('Sanjiv Nursing Home',NULL,'Palladam','Tiruppur','Palladam',NULL,NULL,NULL),
('Prime Medical Centre',NULL,'Palladam','Tiruppur','Palladam',NULL,NULL,NULL);