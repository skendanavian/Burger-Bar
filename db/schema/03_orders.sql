DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description TEXT DEFAULT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'pending'
);

-- status column - 'pending', 'confirmed', 'completed';

-- Mentor suggested looking into CREATE TYPE ENUM 