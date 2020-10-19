


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}


module.exports = {getMenu};




