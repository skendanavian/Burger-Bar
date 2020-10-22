
DELETE FROM menu_items;

ALTER SEQUENCE menu_items_id_seq RESTART;

INSERT INTO menu_items (name, description, thumbnail_url, price)
VALUES ('Royale Burger', 'Im baby put a bird on it vinyl street', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=602&q=80', 1000),
('Super Burger', 'Im baby migas brooklyn aesthetic offal', 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', 1100),
('Special Burger', 'Im baby pinterest whatever humblebrag', 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=703&q=80', 1300),
('Normal Burger', 'Im baby ethical 3 wolf moon XOXO narwhal franzen', 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80', 950),
('Fries', 'Im baby cred church-key thundercats beard, everyday', 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 550);
