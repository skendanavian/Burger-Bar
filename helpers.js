
/* helper for formatOrderItems */
const checkOrderIn = (orders, item) => {
  return orders.some(order => order.order_id === item.order_id);
}


/* Create array of order objects from db query of order_items */
/* requires join of users, order_items, orders and menu_items */
const formatOrderItems = (rows) => {
  const outputOrders = [];

  /* create array of shallow order objects */
  rows.forEach((item, i, rows) => {

    /* if order has not been pushed already then push it */
    if (!checkOrderIn(outputOrders, item)) {
      outputOrders.push({
        order_id: item.order_id,
        created_at: item.created_at,
        description: item.descriptio,
        status: item.status,
        first_name: item.first_name,
        surname: item.surname,
        phone: item.phone,
        order_items: []
      });
    }
  });

  /* fill order_items for each order */
  rows.forEach(item => {

    const orderForItem = outputOrders.find(order => {
      return item.order_id === order.order_id;
    });

    orderForItem.order_items.push({
      menu_item_id: item.menu_item_id,
      menu_item_name: item.menu_item_name,
      quantity: item.quantity
    });
  });

  /* sort menu items in order of their id's to make them should up */
  /* predictable places ie fries on the bottom */
  outputOrders.forEach(order => {
    order.order_items.sort((a, b) => {
      return a.menu_item_id - b.menu_item_id;
    })
  })
  return outputOrders;
}

const estimateOrderTime = function(num, ownerPhone) {
  let estimateMsg = 'Your order will be ready in approximately '
  if (num < 4) {
    estimateMsg += `20 minutes.`;
  } else if (num < 10) {
    estimateMsg += `${Math.round((num * 6) / 5) * 5} minutes.`;
  } else {
    return `Your order may take up to an hour. Please call our store at (${ownerPhone}) for an accurate pickup time.`;
  }
  return estimateMsg;

};

const renderOrderSms = function(orderItems, orderId) {
  const firstName = orderItems[0].first_name;
  const lastName = orderItems[0].last_name;
  let message = `Order #${orderId}\nCustomer: ${firstName} ${lastName}\nOrder details:\n`

  for (let item of orderItems) {
    message += `\[${item.menu_item} - quantity: ${item.quantity}\] \n`;
  }
  return message;
};

module.exports = {
  formatOrderItems,
  renderOrderSms,
  estimateOrderTime
};
