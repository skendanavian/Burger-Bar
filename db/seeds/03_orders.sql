DELETE from orders;

ALTER SEQUENCE orders_id_seq RESTART;


INSERT INTO orders (created_at, user_id, owner_id, description, status)
VALUES
(NOW() - interval '10 seconds', 2, 1, 'Please cook the burger medium rare', 'confirmed'),
(NOW() - interval '20 seconds', 5, 1, 'Extra ketchup Please', 'confirmed'),
(NOW() - interval '1 minute', 7, 1, null, 'completed'),
(NOW() - interval '2 minutes', 4, 1, 'Extra Ketchup on the side please', 'confirmed'),
(NOW() - interval '5 minutes', 10, 1, 'No cheese on burgers','confirmed'),
(NOW() - interval '5 minutes', 1, 1, 'Last time there was too much salt on my fries. Take it easy on that salt! Sorry to in(salt) you!', 'confirmed'),
(NOW() - interval '5 minutes', 9, 1, 'Burgers cooked well done', 'completed'),
(NOW() - interval '6 minutes', 3, 1, 'I think the chef is super cute and would like their number!', 'confirmed'),
(NOW() - interval '20 minutes', 6, 1, 'You are cool', 'confirmed'),
(NOW() - interval '4 minutes', 2, 1, 'add extra onions please', 'completed'),
(NOW() - interval '1 hour', 2, 1, 'Best burgers in town. Keep up the good work!', 'confirmed'),
(NOW() - interval '30 minutes', 7, 1, 'Thanks so much', 'completed');

INSERT INTO orders (created_at, user_id, owner_id, status)
VALUES
(NOW() - interval '1 hour', 3, 1, 'completed');

