const { Router } = require('express')
const routes = Router();
const { authJwt } = require("../middlware");
const controller = require("../controller/user.controller");

routes.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

routes.get("/all", controller.allAccess);

routes.get(
  "/user",
  [authJwt.verifyToken],
  controller.userBoard
);

routes.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

routes.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

module.exports = routes