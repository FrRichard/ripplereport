var express = require('express');
var userRouter = express();

// Authentication routes
var AuthMiddleware = require('../middlewares/auth/AuthMiddleware');
userRouter.post('/login', AuthMiddleware.login);
userRouter.post('/register', AuthMiddleware.register, AuthMiddleware.login);
userRouter.delete('/logout', AuthMiddleware.logout);
userRouter.post('/lostaccount', AuthMiddleware.lostaccount);

// User routes
var UserMiddleware = require('../middlewares/user/UserMiddleware');
userRouter.get('/', AuthMiddleware.getUser, UserMiddleware.get);

// Dashboards routes
// var DashboardMiddleware = require('../middlewares/');
// userRouter.post('/dashboard', AuthMiddleware.getUser, DashboardMiddleware.create);
// userRouter.get('/dashboard/:id', AuthMiddleware.getUser, DashboardMiddleware.getById);
// userRouter.put('/dashboard/:id', AuthMiddleware.getUser, DashboardMiddleware.update);
// userRouter.del('/dashboard/:id', AuthMiddleware.getUser, DashboardMiddleware.delete);

module.exports = userRouter;