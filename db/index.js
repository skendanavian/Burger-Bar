


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
  WHERE is_complete IS FALSE;
  `);
}


module.exports = { getMenu, getIncompleteOrders };




