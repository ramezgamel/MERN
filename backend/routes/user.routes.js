const router = require("express").Router();
const controller = require("../controller/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const {
  updateUserValidator,
  updateUserRoleValidator,
  changePassValidator,
} = require("../validators/user.validator");
const authRoutes = require("./auth.routes");

router.use(authRoutes);
router.use(protect);
router.post("/logout", controller.logout);
router.put("/changePass", changePassValidator, controller.changePassword);
router.post("/notifications/:id", controller.markAsRead);
router.get("/notifications", controller.myNotification);
router
  .route("/profile")
  .put(updateUserValidator, controller.updateUser)
  .get(controller.getProfile);
//admin
router.use(restrictTo(["admin"]));
router.get("/", controller.getUsers);
router.put("/:id", updateUserRoleValidator, controller.updateUserRole);
router.delete("/:id", controller.deleteUserById);

module.exports = router;
