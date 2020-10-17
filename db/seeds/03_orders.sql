DELETE from orders;

ALTER SEQUENCE orders_id_seq RESTART;


INSERT INTO orders (created_at, user_id, owner_id)
VALUES
(NOW() - interval '10 seconds', 2, 1),
(NOW() - interval '20 seconds', 5, 1),
(NOW() - interval '1 minute', 7, 1),
(NOW() - interval '2 minutes', 4, 1),
(NOW() - interval '5 minutes', 10, 1),
(NOW() - interval '5 minutes', 1, 1),
(NOW() - interval '5 minutes', 9, 1),
(NOW() - interval '6 minutes', 3, 1),
(NOW() - interval '20 minutes', 6, 1),
(NOW() - interval '4 minutes', 2, 1),
(NOW() - interval '1 hour', 2, 1),
(NOW() - interval '30 minutes', 7, 1);

