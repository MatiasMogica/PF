const Review = require("../models/Reviews");
const Game = require("../models/Game");

const postReview = async (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;
  const saveComment = await Review({ comments });
  await saveComment.save();

  const foundComm = await Review.find({ comments: { $in: comments } });
  const postGame = await Game.findById(id);
  postGame.comments.push(foundComm.map((e) => e._id));

  const updatedGame = await Game.findByIdAndUpdate(id, postGame, {
    new: true,
  });

  res.json(updatedGame);
};

const getAllReviews = async (req, res) => {
  const allReviews = await Review.find();

  res.json(allReviews);
};

const updateReviews = async (req, res) => {
  const { id } = req.params;

  const { comments } = req.body;

  const updateReviews = await Review.findByIdAndUpdate(id, {
    $set: {
      comments: comments,
    },
  });

  res.json("update reviews done");
};

const deleteReviews = async (req, res) => {
  const { id } = req.params;

  const eliminar = await Review.findByIdAndDelete(id);

  res.json(eliminar);
};

module.exports = {
  postReview,
  getAllReviews,
  deleteReviews,
  updateReviews,
};