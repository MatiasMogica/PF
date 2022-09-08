const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const userPost = async (req, res) => {
  const { username, name, email, password, image } = req.body;

  try {
    const saltRounds = 10;

    const userDB = await User.findOne({ username: username });

    const emailDB = await User.findOne({ email: email });

    if (userDB)
      res.status(300).json({ error: "This username is already being used" });

    if (emailDB)
      res.status(300).json({ error: "This email is already being used" });

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      email,
      hashPassword,
      image,
    });

    const savedUser = await user.save();

    res.status(200).json({ newUser: savedUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userPost,
};
