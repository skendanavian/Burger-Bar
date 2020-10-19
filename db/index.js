

const getMenu = function (db) {
  return db.query(`
  SELECT *
  FROM menu_items;
  `).then(res => {
    return res.rows;
  });
}

console.log(getMenu());

module.exports = { getMenu };



