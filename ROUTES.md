

url(/) //GET: Landing page w/ order button & menu button 
url(/) //POST: Nothing

url(/menu): GET: render static menu page

<!-- Not sure if need to GET or POST to show confirmation page per restful convention -->
url(/order) //GET: return order page if logged in, otheriwse redirect to login 
<!-- url(/order) //POST: ?? -->

<!-- maybe these should use orderID ?? -->
url(/order/:userId) // GET: order confirmation page
url(/order/userId) //POST: submit order from user


url(/login) // GET: render page for login
url(/login) // POST: send login info for validation/setting cookie -> redirect to order page if success

url(/register)  GET: render register page
url(/register)  POST: send user info to register new account -> redirect to order page if validates 
url(/logout) POST: clear cookie and redirect to landing page



