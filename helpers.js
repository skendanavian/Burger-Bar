
/* Create array of order objects from db query of order_items */
/* requires join of users, order_items, orders and menu_items */
const formatOrderItems = (rows) => {
  const orders = [];

  /* create array of shallow order objects */
  rows.forEach(item => {
    orders.push({
      order_id: item.id,
      created_at: item.created_at,
      description: item.description,
      status: item.status,
      first_name: item.first_name,
      surname: item.surname,
      phone: item.phone,
      order_items: []
    });
  });

  /* fill order_items for each order */
  rows.forEach(item => {

    const order = orders.find(({order_id}) => {
      order_id === item.order_id;
    });

    order.order_items.push({
      menu_item_name: item.menu_item_name,
      quantity: item.quantity
    });
  });

  return orders;
}

const estimateOrderTime = function(num, ownerPhone) {
  let estimateMsg = 'Your order will be ready in '
  if (num < 4) {
    estimateMsg += `20 minutes.`;
  } else if (num < 10) {
    estimateMsg += `${Math.round((num * 6) / 5) * 5} minutes.`;
  } else {
    return `Please call our store (${ownerPhone}) for an estimated pickup time.`;
  }
  return estimateMsg;

};

const renderOrderSms = function(orderItems, orderId) {
  const firstName = orderItems[0].first_name;
  const lastName = orderItems[0].last_name;
  let message = `New Order For ${firstName} ${lastName}. Order #${orderId}. Order Details: `

  for (let item in orderItems) {
    message += ` [${item.menu_item} - quantity: ${item.quantity}] `;
  }
};

module.exports = {
  formatOrderItems,
  renderOrderSms,
  estimateOrderTime
};
