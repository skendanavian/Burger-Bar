


const getMenu = function(db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `).then(res => {
    // console.log('Im in the helper', res.rows);
    return res.rows;
  }).catch(err => {
    return err;
  });
}








module.exports = {getMenu};
// console.log(getMenu());




