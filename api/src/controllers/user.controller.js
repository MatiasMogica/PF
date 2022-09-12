const User = require("../models/User.js");
const bcrypt = require("bcrypt");


const getByName = ({ users, name }) => {
  return users.filter((user) => {
    user.name?.toLowerCase().includes(name.toLowerCase);
  });
};

const getByEmail = ({ users, email }) => {
  return users.filter((user) => {
    user.email?.toLowerCase().includes(email.toLowerCase);
  });
};


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


const getUsers = async (req, res) => {
  const { name, email } = req.query;
  try {
    let users = await User.find({});

    if (name) users = getByName({ users, name });
    else if (email) users = getByEmail({ users, email });
    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getUserByID = async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await User.findById(idUser);

    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const putUser = async (req, res) => {
  const { idUser } = req.params;
  const { name, email, password, image } = req.body;
  try {
    const user = await User.findById(idUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const becomeAdmin = async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await User.findById(idUser);
    user.admin
      ? await user.updateOne({ admin: false })
      : await user.updateOne({ admin: true });
    res.status(200).json({ status: "User updated succesfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await User.findById(idUser);
    user.deleted
      ? await user.updateOne({ deleted: false })
      : await user.updateOne({ deleted: true });
    console.log(user);
    return res.status(200).json({ status: "User deleted status change" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};


module.exports = {
  getByName,
  getByEmail,
  userPost,
  getUsers,
  getUserByID,
  putUser,
  becomeAdmin,
  deleteUser,
};