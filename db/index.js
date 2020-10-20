


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}

const getIncompleteOrders = function (db) {
  return db.query(`
  SELECT  orders.id as order_id,
          orders.created_at,
          orders.description,
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
  WHERE is_complete IS FALSE;
  `);
}


module.exports = { getMenu, getIncompleteOrders };




