## REST ROUTES

GET: (/) - Root Index
GET: (/menu) 
GET: (/about)

# User Authentication
GET: (/login)
POST: (/Login)
GET: (/register)
POST (/register)
GET: (/logout)

# Online Order Routes
GET: (/order)
POST: (/order) 
GET:  (/order/:orderid)
POST: (/order/:orderid/confirmation)


# Kitchen Routes
GET: (/kitchen)
POST: (/kitchen/:orderId/complete)
POST: (/kitchen/:orderId/ready)



