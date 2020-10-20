


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
}.catch((err) => err);

const addOrderItems = function(db, orderId, items) {
  for (let i in items) {
    if (items[1].length = 2) {
      const values = [items[i][1], orderId, i]
      console.log(values)
      return db.query(`
      INSERT INTO order_items (quantity, order_id, menu_item_id)
      VALUES ($1,$2,$3)`, values);
    }

  }
  // return db.query(`
  // INSERT *
  // VALUES order
  // RETRUNING *
  // `).then(res => {
  // });
}.catch((err) => err);
// const addProperty = function(property) {
//   const p = property
//   const newProperty = [p.owner_id, p.title, p.description, p.thumbnail_photo_url, p.cover_photo_url, p.cost_per_night, p.street, p.city, p.province, p.post_code, p.country, p.parking_spaces, p.number_of_bathrooms, p.number_of_bedrooms];
//   return pool.query(`INSERT INTO properties (
//      owner_id, title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
//     VALUES (
//     $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, newProperty).then(res => {
//     return res.rows[0];
//   })
// }

// router.post('/properties', (req, res) => {
//   const userId = req.session.userId;
//   database.addProperty({...req.body, owner_id: userId})
//     .then(property => {
//       res.send(property);
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e)
//     });
// });


module.exports = {getMenu, addOrder, addOrderItems};




