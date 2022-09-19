const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    // idGame: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Game",
    //   },
    // ],
    // favorites: {
    //   type: Boolean,
    // },
    // note: {
    //   type: Number,
    //   max: 10,
    // },
    comments: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Review", reviewSchema);