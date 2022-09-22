const Review = require("../models/Reviews");
const Game = require("../models/Game");

const postReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comments, author } = req.body;
    console.log(req.body);
    const saveComment = await Review({ comments, author });
    await saveComment.save();

    const foundComm = await Review.find({ comments: { $in: comments } });
    const postGame = await Game.findById(id);
    postGame.comments.push(foundComm.map((e) => e._id));
    console.log(postGame);

    const updatedGame = await Game.findByIdAndUpdate(id, postGame, {
      new: true,
    });

    res.status(201).json(updatedGame);
  } catch (error) {
    console.log(error);
  }
};

// const postLike = async (req, res) => {
//   const { id } = req.params;
//   const { likes, dislikes } = req.body;

//   const postGame = await Game.findById(id);
//   postGame.likes = postGame.likes + 1;
//   postGame.dislikes = postGame.dislikes + 1;

//   const updatedGame = await Game.findByIdAndUpdate(id, postGame, {
//     new: true,
//   });

//   res.json(updatedGame);
// };

const postLike = async (req, res) => {
  const { id } = req.params;

  const postGame = await Game.findById(id);
  postGame.likes = postGame.likes + 1;

  const updatedGame = await Game.findByIdAndUpdate(id, postGame, {
    new: true,
  });

  res.json(updatedGame);
};

const postDislike = async (req, res) => {
  const { id } = req.params;

  const postGame = await Game.findById(id);
  postGame.dislikes = postGame.dislikes + 1;

  const updatedGame = await Game.findByIdAndUpdate(id, postGame, {
    new: true,
  });

  res.json(updatedGame);
};

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find();

    res.status(200).json(allReviews);
  } catch (error) {
    console.log(error);
  }
};

const updateReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const { comments } = req.body;

    const updateReviews = await Review.findByIdAndUpdate(id, {
      $set: {
        comments: comments,
      },
    });

    res.status(201).json("update reviews done");
  } catch (error) {
    console.log(error);
  }
};

const deleteReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminar = await Review.findByIdAndDelete(id);

    res.status(200).json(eliminar);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postReview,
  getAllReviews,
  deleteReviews,
  updateReviews,
  postLike,
  postDislike,
};