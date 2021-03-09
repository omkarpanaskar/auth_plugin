const {Router }  = require('express')
const routes = Router()
const { verifySignUp } = require("../middlware");
const controller = require("../controller/auth.controller");


  routes.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  routes.get(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  routes.post("/signin", controller.signin);

module.exports = routes