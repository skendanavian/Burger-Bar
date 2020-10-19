SELECT (SELECT phone as owner_phone
FROM users
JOIN orders ON owner_id = users.id
WHERE orders.id = 2 AND is_owner = 'true'
GROUP BY owner_id, users.phone),

(SELECT phone as customer_phone
FROM users
JOIN orders ON user_id = users.id
WHERE orders.id = 2 AND is_owner = 'false'
GROUP BY user_id, users.phone);



