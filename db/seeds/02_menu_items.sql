
DELETE FROM menu_items;

ALTER SEQUENCE menu_items_id_seq RESTART;

INSERT INTO menu_items (name, description, thumbnail_url, price, ingredients)
VALUES ('Royale Burger', 'Hello
  I wish I was little bit taller
  I wish I was a baller
  I wish I had a burg who looked good, I would call her
  I wish I had a rabbit in a hat with a bat
  And a six four Impala', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=602&q=80', 1000, 'standard charbroiled patty, cheddar cheese, brioche bun, sweet onions, beets, and our house made mayo.'),

('Super Burger', 'Somebody once told me the world is gonna roll me
  I aint the sharpest tool in the shed
  She was looking kind of dumb with her finger and her thumb
  In the shape of an L on her forehead', 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80', 1100, '500g charbroiled patty, american cheese, cheddar cheese, bakery roll, dill pickles, and our house made spam.
'),

('Special Burger', 'Is this the real life, is this just fantasy?
  Caught in a landslide no escape from reality
  Open your eyes look up to the skies and see
  Im just a poor boy, I need no sympathy', 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=703&q=80', 1300, 'hand-rubbed charbroiled patty, gruyere cheese, braised pineapple, bacon-of-the-day, and our house made lamb'),

('Normal Burger', 'Purchase fast food and disguise it as your own cooking. Delightfully devilish, Seymour', 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80', 950, 'charred-then-broiled patty, normal cheese, organic lettuce, sesame seeds, and our house made clam'),

('Fries', 'Best fries in the hemisphere', 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 550, 'Potatoes');
