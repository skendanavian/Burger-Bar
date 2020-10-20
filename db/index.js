


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}

const addOrder = function(db, items) {
  return console.log('hello')
}

const addOrderItems = function() {


}


module.exports = {getMenu, addOrder, addOrderItems};




