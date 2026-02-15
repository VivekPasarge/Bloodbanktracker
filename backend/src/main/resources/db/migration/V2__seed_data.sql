-- V2: seed data
INSERT INTO users (email, password, name, role) VALUES
('admin@bb.com', '$2a$10$DowJ0zFQ6aZq3fZ6O4o9uOdq6vQ1c6g9p7B0nYvYjG9yJ2Y8pFQ1e', 'Admin User', 'ROLE_ADMIN'),
('donor@bb.com', '$2a$10$DowJ0zFQ6aZq3fZ6O4o9uOdq6vQ1c6g9p7B0nYvYjG9yJ2Y8pFQ1e', 'Sample Donor', 'ROLE_DONOR');

-- Password hashes above are bcrypt for 'password' (for dev only)

INSERT INTO donor_profiles (user_id, blood_type, city, phone, available) VALUES
(2, 'A+', 'Bengaluru', '9876543210', true);

INSERT INTO blood_inventory (blood_type, units) VALUES
('A+', 10), ('B+', 5), ('O+', 20);

INSERT INTO nearby_hospitals (name, address, city, latitude, longitude, phone) VALUES
('City General Hospital', '123 Main St', 'Bengaluru', 12.9716, 77.5946, '08012345678'),
('Eastside Clinic', '45 East Rd', 'Bengaluru', 12.9750, 77.5990, '08087654321');

INSERT INTO deliveries (pickup_address, drop_address, contact_name, contact_phone, status) VALUES
('City Blood Bank', 'City General Hospital', 'Courier', '9999999999', 'PENDING');
