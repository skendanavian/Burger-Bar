SELECT phone as customer_phone
FROM users
JOIN orders ON user_id = users.id
WHERE orders.id = 1 AND is_owner = 'false'
GROUP BY user_id, users.phone;