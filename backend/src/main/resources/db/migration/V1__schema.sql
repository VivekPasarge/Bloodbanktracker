-- V1: schema
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50),
  token VARCHAR(1000)
);

CREATE TABLE donor_profiles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  blood_type VARCHAR(10),
  city VARCHAR(100),
  phone VARCHAR(50),
  available BOOLEAN
);

CREATE TABLE blood_inventory (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  blood_type VARCHAR(10),
  units INT
);

CREATE TABLE nearby_hospitals (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(500),
  city VARCHAR(100),
  latitude DOUBLE,
  longitude DOUBLE,
  phone VARCHAR(100)
);

CREATE TABLE deliveries (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  pickup_address VARCHAR(500),
  drop_address VARCHAR(500),
  contact_name VARCHAR(255),
  contact_phone VARCHAR(100),
  status VARCHAR(50)
);
