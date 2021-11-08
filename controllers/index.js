const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const userDashboardRoutes = require("./userDashboardRoutes");

router.use("/", homeRoutes);
router.use("/dashboard", userDashboardRoutes);
router.use("/api", apiRoutes);


module.exports = router;
