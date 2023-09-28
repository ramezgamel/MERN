const router = require("express").Router();
const controller = require("../controller/user.controller");
const { protect, restrictTo } = require("../middleware/auth.middelware");
const upload = require("../middleware/upload");

router.post("/register", upload.single("image"), controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
// auth
router.put("/profile", upload.single("image"), protect, controller.updateUser);
//admin
router.get("/", protect, restrictTo(["admin"]), controller.getUsers);
router.put("/:id", protect, restrictTo(["admin"]), controller.updateUserById);
router.delete(
  "/:id",
  protect,
  restrictTo(["admin"]),
  controller.deleteUserById
);

module.exports = router;
