
DELETE FROM users;

ALTER SEQUENCE users_id_seq RESTART;

INSERT INTO users (first_name, surname, phone, email, password, is_owner) VALUES
('Billy', 'Owner', '800-500-0100', 'owner@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', true);

INSERT INTO users (first_name, surname, phone, email, password) VALUES
('Kevin', 'Kent', '800-500-0200', 'kevin@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Greg', 'Gregerson', '800-500-0300', 'greg@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Aaron', 'Carter', '800-500-0400', 'aaron@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kyle', 'Smith', '800-500-0500', 'kyle@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Francis', 'Bourgouin', '800-500-0600', 'francis@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bobby', 'Smith', '800-500-0700', 'bobby@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Edward', 'Smith', '800-500-0800', 'edward@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Brian', 'Smith', '800-500-0900', 'brian@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Alice', 'Anderson', '800-500-1000', 'alice@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

