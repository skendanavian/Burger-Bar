SELECT  users.first_name
       ,orders.id                 AS order_id
       ,SUM(order_items.quantity) AS quantity_of_items
FROM orders
JOIN order_items
ON orders.id = order_items.order_id
JOIN users
ON users.id=orders.user_id
GROUP BY  users.first_name
         ,orders.id
ORDER BY users.first_name;
