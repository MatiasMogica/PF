const { Router } = require("express");

const {
  postOrder,
  deleteOrder,
  allOrders,
  idOrder,
  getOrderStats,
} = require("../controllers/order.controller");

const router = Router();

router.post("/postOrder", postOrder);

router.delete("/deleteOrder/:id", deleteOrder);

router.get("/order", allOrders);

router.get("/order/:id", idOrder);

//ORDER STATS
router.get("/stats", getOrderStats);

module.exports = router;
