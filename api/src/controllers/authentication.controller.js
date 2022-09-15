const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { googleVerify } = require("../helpers/google-verify.js");

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.find({ username });

  const passwordCorrect =
    user === null || user.length === 0
      ? false
      : await bcrypt.compare(password, user[0].hashPassword);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Invalid user or password" });
  }

  const userForToken = {
    id: user[0]._id,
    username: user[0].username,
    email: user[0].email,
    name: user[0].name,
    image: user[0].image,
    backgroundImage: user[0].backgroundImage,
  };

  const token = jwt.sign(userForToken, process.env.JWT_secret_key);

  user[0].deleted
    ? res.status(200).json({ error: "User is blocked" })
    : res.status(200).json({ auth: "User login success", userForToken, token });
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  //validar token de google
  try {
    const { email, name, image, username } = await googleVerify(id_token);

    let usuario = await User.findOne({ email });

    if (!usuario) {
      //tengo que crearlo
      const data = {
        username,
        name,
        email,
        hashPassword: ":P",
        image,
        google: true,
        backgroundImage,
      };

      usuario = new User(data);
      await usuario.save();
    }
    // Generar el JWT
    const userForToken = {
      id: usuario._id,
      username: usuario.username,
      email: usuario.email,
      admin: usuario.admin,
      friends: usuario.friends,
      age: usuario.age,
      nationality: usuario.nationality,
      posts: usuario.posts,
      createdAt: usuario.createdAt,
      backgroundImage: usuario.backgroundImage,
    };

    const token = jwt.sign(userForToken, process.env.JWT_secret_key);

    res.json({
      msg: "todo bien! google signin",
      token,
      userForToken,
    });
  } catch (error) {
    res.status(400).json({
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
