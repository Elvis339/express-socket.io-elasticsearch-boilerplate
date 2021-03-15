const controller = require("../modules/User/Controller/UserController");
const auth = require("../middleware/AuthMiddleware");

module.exports = (router) => {
  // Register
  router
    .route("/users")
    .post(controller.add)
    // Home
    .get(auth, controller.getHome);

  // Login
  router.route("/login").post(controller.login);

  // Edit my profile
  router.route("/me").patch(auth, controller.editMe);

  // Search
  router.route("/search").post(controller.searchUsers);
};
