
DELETE FROM users;

ALTER SEQUENCE users_id_seq RESTART;

INSERT INTO users (first_name, surname, phone, email, password, is_owner) VALUES
('Billy', 'Owner', '800-500-0100', 'dummy@example.com', 'password', true);

INSERT INTO users (first_name, surname, phone, email, password) VALUES
('Kevin', 'Kent', '800-500-0200', 'dummy@example.com', 'password'),
('Greg', 'Gregerson', '800-500-0300', 'dummy@example.com', 'password'),
('Aaron', 'Carter', '800-500-0400', 'dummy@example.com', 'password'),
('Kyle', 'Smith', '800-500-0500', 'dummy@example.com', 'password'),
('Francis', 'Bourgouin', '800-500-0600', 'dummy@example.com', 'password'),
('Bobby', 'Smith', '800-500-0700', 'dummy@example.com', 'password'),
('Edward', 'Smith', '800-500-0800', 'dummy@example.com', 'password'),
('Brian', 'Smith', '800-500-0900', 'dummy@example.com', 'password'),
('Alice', 'Anderson', '800-500-1000', 'dummy@example.com', 'password');

