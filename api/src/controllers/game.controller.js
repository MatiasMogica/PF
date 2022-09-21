const Game = require("../models/Game.js");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

const allGames = async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      const resultBD = await Game.find({
        name: {
          $regex: new RegExp(name, "ig"),
        },
      });
      return resultBD.length
        ? res.status(200).json(resultBD)
        : res.status(404).json({ msg: "Game not found" });
    }

    const resultBD = await Game.find({}).populate("comments");
    resultBD.length
      ? res.status(200).json(resultBD)
      : res.status(404).json({ msg: "There are not documents on Game Model" });
  } catch (err) {
    next(err);
  }
};
//----------------------------------------------------------------
const detailGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const juego = await Game.findById(id).populate("comments");
    if (!juego) return res.status(404).json({ msg: "Games not found" });
    if (!juego.idAPI) {
      const game = {
        name: juego.name,
        background_image: juego.background_image,
        platforms: juego.platforms,
        released: juego.released,
        rating: juego.rating,
        price: juego.price,
        genres: juego.genres,
        description: juego.description,
        comments: juego.comments,
        // likeCount: juego.likeCount,
        // getPercentageOfLikes: juego.getPercentageOfLikes,
        likes: juego.likes,
        dislikes: juego.dislikes,
      };
      return res.status(200).json(game);
    }

    const { data } = await axios(
      `https://api.rawg.io/api/games/${juego.idAPI}?key=${API_KEY}`
    );

    const game = {
      name: juego.name,
      background_image: juego.background_image,
      platforms: juego.platforms,
      released: juego.released,
      rating: juego.rating,
      price: juego.price,
      genres: juego.genres,
      description: data.description,
    };
    return res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};
//----------------------------------------------------------------

const genres = [
  "action",
  "indie",
  "adventure",
  "rPG",
  "strategy",
  "shooter",
  "casual",
  "simulation",
  "puzzle",
  "arcade",
  "platformer",
  "racing",
  "massively-multiplayer",
  "sports",
  "fighting",
  "family",
  "board Games",
  "educational",
  "card",
];

const dataApi = async (req, res) => {
  const info1 = await axios.get(
    `https://api.rawg.io/api/games?key=8f18e9d52c1a4529b8ffba93f32936dd&page_size=40`
  );
  const info2 = await axios.get(info1.data.next);
  const info3 = await axios.get(info2.data.next);
  const info4 = await axios.get(info3.data.next);

  const infoTotal = info1.data.results
    .concat(info2.data.results)
    .concat(info3.data.results)
    .concat(info4.data.results);

  infoTotal.forEach((gamer) => {
    Game.create({
      idAPI: gamer.id,
      name: gamer.name,
      background_image: gamer.background_image,
      platforms: gamer.platforms.map((current) => current.platform.name),
      released: gamer.released,
      rating: gamer.rating,
      price: Math.floor(Math.random() * (100 - 5) + 5),
      genres: gamer.genres.map((current) => current.name),
    });

    console.log(gamer.released);
    console.log(gamer.rating);
    console.log(gamer.platforms.map((current) => current.platform.name));
  });

  res.status(200).json({ msg: "Games added succesfully" });
};

const newGame = async (req, res) => {
  const { newGame } = req.body;
  const game = new Game({
    newGame,
  });
  console.log(game);
  await game.save();
  res.json({ status: "game added" });
};

const getGamesById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id);

    return res.status(200).json({ game: game });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const getGenres = async (req, res) => {
  const genres = [
    "action",
    "indie",
    "adventure",
    "rPG",
    "strategy",
    "shooter",
    "casual",
    "simulation",
    "puzzle",
    "arcade",
    "platformer",
    "racing",
    "massively-multiplayer",
    "sports",
    "fighting",
    "family",
    "board Games",
    "educational",
    "card",
  ];
  try {
    return res.status(200).json({ genres });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const postGame = async (req, res) => {
  const game = req.body;
  try {
    await Game.create(game);
    return res.status(200).json({ gameAdded: "Game added" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const putGame = async (req, res) => {
  const { id } = req.params;
  const game = req.body;
  try {
    const gameUpdate = await Game.updateOne(
      { _id: id },
      {
        $set: {
          name: game.name,
          description: game.description,
          released: game.released,
          background_image: game.background_image,
          platforms: game.platforms,
          genres: game.genres,
          rating: game.rating,
          price: game.price,
        },
      }
    );
    console.log(gameUpdate);
    res.status(200).json({ gameUpdate: gameUpdate });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const gameDeleted = await Game.findByIdAndDelete(id);
    if (!gameDeleted)
      return res.status(200).json({ msg: "Game cannot be deleted" });
    return res
      .status(200)
      .json({ game: gameDeleted, msg: "Game deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const API = async (req, res, next) => {
  try {
    const { data } = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    return res.status(200).json(data.results);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  allGames,
  newGame,
  detailGame,
  getGamesById,
  getGenres,
  postGame,
  putGame,
  deleteGame,
  dataApi,
  API,
};
