SELECT  orders.id AS order_id
       ,SUM(order_items.quantity) AS quantity_of_items
FROM orders
JOIN order_items
ON orders.id = order_items.order_id
WHERE orders.id = 4
GROUP BY  orders.id;