const Order = require("../models/Order");

const postOrder = async (req, res, next) => {
  const newOrder = req.body;
  try {
    const order = new Order(newOrder);
    console.log(order);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderDeleted = await Order.findByIdAndDelete(id);
    if (!orderDeleted)
      return res.status(200).json({ msg: "Order cannot be deleted" });
    //await User.deleteMany({ payment_status:'approved'})
    return res
      .status(200)
      .json({ order: orderDeleted, msg: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};
const allOrders = async (req, res, next) => {
  try {
    const Orders = await Order.find({});
    Orders.length
      ? res.status(200).json(Orders)
      : res.status(404).json({ msg: "There are not documents on Order Model" });
  } catch (err) {
    next(err);
  }
};
const idOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const getOrderStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total_price",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { postOrder, deleteOrder, allOrders, idOrder, getOrderStats };
