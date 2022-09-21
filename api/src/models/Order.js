const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    games: [
      {
        title: { type: String },
        subtotal_price: { type: Number },
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.hashPassword;
  },
});

module.exports = model("Order", orderSchema);
