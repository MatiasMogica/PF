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
    comments: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Game", gameSchema);
