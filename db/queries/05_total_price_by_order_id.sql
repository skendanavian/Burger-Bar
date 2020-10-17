SELECT orders.id as order_number, users.id as user_id, SUM(menu_items.price * order_items.quantity) as total_price
FROM orders
JOIN order_items ON orders.id = order_id
JOIN menu_items ON menu_items.id = order_items.menu_item_id
JOIN users ON users.id = orders.user_id
Where orders.id = 3
GROUP BY orders.id, users.id;