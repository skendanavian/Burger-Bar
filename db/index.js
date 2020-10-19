


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}

const getIncompleteOrders = function (db) {
  return db.query(`
  SELECT *
  FROM orders
  JOIN order_items
  ON orders.id = order_items.order_id
  JOIN menu_items
  ON menu_items.id = order_items.menu_item_id
  WHERE is_complete IS FALSE;
  `);
}


module.exports = { getMenu, getIncompleteOrders };




