DELETE from order_items;

ALTER SEQUENCE order_item_id_seq RESTART;

INSERT INTO order_items (order_id, menu_item_id, quantity)
VALUES
(1, 1, 1),
(1, 5, 1),
(2, 2, 1),
(2, 5, 1),
(3, 4, 1),
(3, 5, 2),
(4, 1, 1),
(4, 5, 1),
(5, 3, 4),
(5, 4, 1),
(5, 5, 5),
(6, 1, 1),
(6, 2, 4),
(6, 5, 6),
(7, 4, 1),
(8, 1, 1),
(8, 2, 1),
(8, 3, 1),
(8, 5, 3),
(9, 5, 1),
(10, 1, 1),
(10, 5, 1),
(11, 1, 1),
(11, 4, 1),
(11, 5, 2),
(12, 1, 1),
(13, 1, 2);
