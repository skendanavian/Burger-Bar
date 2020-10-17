SELECT  orders.id as order_id
       ,user_id
       ,COUNT(order_items.*) as different_items_chosen
FROM orders
JOIN order_items
ON orders.id = order_items.order_id
GROUP BY  orders.id
         ,user_id
order by orders.id;
