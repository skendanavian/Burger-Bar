

/* MENU */
const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}

/* KITCHEN RUNNER */

const getIncompleteOrders = function (db) {
  return db.query(`
  SELECT  orders.id as order_id,
          orders.created_at,
          orders.description,
          orders.status,
          menu_items.id AS menu_item_id,
          menu_items.name AS menu_item_name,
          order_items.id AS order_item_id,
          order_items.quantity,
          users.first_name,
          users.surname,
          users.phone
  FROM order_items
  JOIN orders
  ON order_items.order_id = orders.id
  JOIN menu_items
  ON order_items.menu_item_id = menu_items.id
  JOIN users
  ON orders.user_id = users.id
  WHERE status IN ('confirmed', 'ready')
  ORDER BY orders.created_at DESC;
  `);
}

const getPhoneForOrder = function(db, orderId) {
  return db.query(`
  SELECT phone,
  FROM users
  JOIN orders ON
  orders.user_id = users.id
  WHERE orders.id = $1;
  `, [orderId]);
}

const setOrderStatus = function (db, orderId, status) {
  return db.query(`
  UPDATE orders
  SET status = $2
  WHERE orders.id = $1;
  `, [orderId, status]);
}


/* ORDER */

const addOrder = function(db, ids) {
  // Take in userId, ownerId, items, db
  const {userId, ownerId} = ids;
  console.log('made it to helper', ids);
  return db.query(`
  INSERT INTO orders (user_id, owner_id) VALUES ($1, $2)
  RETURNING *
  `, [userId, ownerId]);
}

const addOrderItems = function(db, orderId, items) {
  return Promise.all(Object.keys(items).map((i) => {
    if (items[i].length === 2) {
      const values = [items[i][1], orderId, i]
      console.log(values)
      return db.query(`
      INSERT INTO order_items (quantity, order_id, menu_item_id)
      VALUES ($1,$2,$3)`, values);
    }
  }));
};

const getOrder = function(db, orderId) {
  return db.query(`
  SELECT  orders.id as order_id
       ,users.first_name as first_name
       , users.surname as last_name
       ,users.phone
       ,orders.created_at
       ,menu_items.name as menu_item
       ,order_items.quantity
       ,menu_items.price as unit_price
       ,orders.description
FROM orders
JOIN order_items
ON orders.id = order_items.order_id
JOIN menu_items
ON menu_items.id = order_items.menu_item_id
JOIN users
ON user_id = users.id
WHERE orders.id = ${orderId}
GROUP BY orders.id, users.first_name, users.surname, menu_items.name, users.phone, order_items.quantity, menu_items.price
order by orders.id;
`);
}

const getOrderPrice = function(db, orderId) {
  return db.query(`
  SELECT orders.id as order_number, users.id as user_id, SUM(menu_items.price * order_items.quantity) as total_price
  FROM orders
  JOIN order_items ON orders.id = order_id
  JOIN menu_items ON menu_items.id = order_items.menu_item_id
  JOIN users ON users.id = orders.user_id
  Where orders.id = ${orderId}
  GROUP BY orders.id, users.id;
`);
}



module.exports = {
  getMenu,
  addOrder,
  addOrderItems,
  getOrder,
  getOrderPrice,
  getIncompleteOrders,
  setOrderStatus,
  getPhoneForOrder,
};




