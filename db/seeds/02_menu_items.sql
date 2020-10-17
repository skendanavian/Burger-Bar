
DELETE FROM menu_items;

ALTER SEQUENCE menu_items_id_seq RESTART;

INSERT INTO menu_items (name, description, thumbnail_url, price)
VALUES ('Royale', 'Im baby put a bird on it vinyl street', 'https://source.unsplash.com/random/80x80', 1000),
('Super', 'Im baby migas brooklyn aesthetic offal', 'https://source.unsplash.com/random/80x80', 1100),
('Special', 'Im baby pinterest whatever humblebrag', 'https://source.unsplash.com/random/80x80', 1300),
('Normal', 'Im baby ethical 3 wolf moon XOXO narwhal franzen', 'https://source.unsplash.com/random/80x80', 950),
('Fries', 'Im baby cred church-key thundercats beard, everyday', 'https://source.unsplash.com/random/80x80', 550);
