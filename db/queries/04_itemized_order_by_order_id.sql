SELECT  orders.id as order_id
       ,CONCAT(users.first_name, users.surname) as customer_name
       ,users.phone
       ,orders.created_at
       ,menu_items.name as menu_item
       ,order_items.quantity
       ,orders.description     
FROM orders
JOIN order_items
ON orders.id = order_items.order_id
JOIN menu_items
ON menu_items.id = order_items.menu_item_id
JOIN users
ON user_id = users.id
WHERE orders.id = 1
GROUP BY orders.id, users.first_name, users.surname, menu_items.name, users.phone, order_items.quantity
order by orders.id;