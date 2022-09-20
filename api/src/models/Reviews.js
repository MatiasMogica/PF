const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    author: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Review", reviewSchema);
