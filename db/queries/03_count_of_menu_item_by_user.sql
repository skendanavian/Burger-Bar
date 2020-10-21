SELECT  users.first_name
       ,SUM(order_items.quantity) AS how_many_are_ordered
FROM users
JOIN orders
ON users.id = orders.user_id
JOIN order_items
ON orders.id = order_items.order_id
JOIN menu_items
ON order_items.menu_item_id = menu_items.id
WHERE menu_items.name = 'Fries'
group by users.first_name
order by SUM(order_items.quantity) DESC;


