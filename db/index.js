


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `);
}

const addOrder = function(db, ids) {
  // Take in userId, ownerId, items, db
  const {userId, ownerId} = ids;
  // console.log(items)
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

  //   [

  //     1: ['on', 2],


  // ]



  for (let i in items) {
    if (items[i].length === 2) {
      const values = [items[i][1], orderId, i]
      console.log(values)
      return db.query(`
      INSERT INTO order_items (quantity, order_id, menu_item_id)
      VALUES ($1,$2,$3)`, values);
    }
  }
};



module.exports = {getMenu, addOrder, addOrderItems};




