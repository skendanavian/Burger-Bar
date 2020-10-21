SELECT phone as owner_phone
FROM users
JOIN orders ON owner_id = users.id
WHERE orders.id = 1 AND is_owner = 'true'
GROUP BY owner_id, users.phone;


