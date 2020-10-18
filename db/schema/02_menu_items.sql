DROP TABLE IF EXISTS menu_items CASCADE;
-- Drop widgets table from project skeleton
DROP TABLE IF EXISTS widgets CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500) NOT NULL,
  price INTEGER NOT NULL
);