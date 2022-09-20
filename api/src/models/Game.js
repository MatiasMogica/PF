const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const gameSchema = new Schema(
  {
    idAPI: {
      type: String,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    background_image: {
      type: String,
      required: true,
    },
    platforms: [
      {
        type: Schema.Types.String,
        required: true,
      },
    ],
    released: {
      type: String,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    genres: [
      {
        type: Schema.Types.String,
        required: true,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    // comments: { type: [String], default: [] },
    // comments: [
    //   {
    //     type: [String],
    //     ref: "Review",
    //     default: [],
    //   },
    // ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    // likeCount: { type: Number, default: 0 },
    // likes: { type: Number, default: 0 },
    // disklikes: { type: Number, default: 0 },
    getPercentageOfLikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Game", gameSchema);
