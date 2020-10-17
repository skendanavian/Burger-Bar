DELETE from orders;

ALTER SEQUENCE orders_id_seq RESTART;


INSERT INTO orders (created_at, user_id, owner_id, description)
VALUES
(NOW() - interval '10 seconds', 2, 1, 'Please cook the burger medium rare'),
(NOW() - interval '20 seconds', 5, 1, null),
(NOW() - interval '1 minute', 7, 1, null),
(NOW() - interval '2 minutes', 4, 1, 'Extra Ketchup on the side please'),
(NOW() - interval '5 minutes', 10, 1, null),
(NOW() - interval '5 minutes', 1, 1, 'Last time there was too much salt on my fries. Take it easy on that salt! Sorry to in(salt) you!'),
(NOW() - interval '5 minutes', 9, 1, null),
(NOW() - interval '6 minutes', 3, 1, 'I think the chef is super cute and would like their number!'),
(NOW() - interval '20 minutes', 6, 1, null),
(NOW() - interval '4 minutes', 2, 1, null),
(NOW() - interval '1 hour', 2, 1, 'Best burgers in town. Keep up the good work!'),
(NOW() - interval '30 minutes', 7, 1, null);

INSERT INTO orders (created_at, user_id, owner_id, is_complete)
VALUES
(NOW() - interval '1 hour', 3, 1, 'true');

