


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}

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



module.exports = {getMenu, addOrder, addOrderItems, getOrder, getOrderPrice};




