const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});

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

    const { requestId } = await courier.send({
      message: {
        to: {
          data: {
            name: "Contact-Form",
          },

          email: user.email,
        },
        content: {
          title: `Welcome ${user.name} to Zteam`,
          body: `Hi ${user.name} we are happy that you decide to join us your username is ${user.username}.
        If you want to contact us you can do it to the email: videogames.zteam@gmail.com
        `,
        },
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });

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
const userGames=async(req,res,next)=>{
  const { idUser } = req.params;

  const {cartItems } = req.body;
  //array de ids de juegos comprados
  const idItems=cartItems.map(cart=>{
    return cart._id
  })

  
  try {
    const user = await User.findById(idUser);
    if(!user)return res.status(404).send('user not found')
    
    const newItems=[...new Set([...user.purchasedGames,...idItems])]
    
    const userUpdated=await User.findByIdAndUpdate(idUser, {purchasedGames:newItems}, {
      new: true
    });
    console.log(userUpdated);
    if(!userUpdated) return response.status(400).send('Not updated')
    return res.status(200).json(userUpdated)
    
  } catch (error) {
    next(error)
  }
}

const putUser = async (req, res) => {
  const { idUser } = req.params;
  const {
    name,
    email,
    age,
    nationality,
    profileVisibility,
    image,
    backgroundImage,
  } = req.body;

  try {
    const user = await User.findById(idUser);

    image ? await user.updateOne({ image }) : null;
    backgroundImage ? await user.updateOne({ backgroundImage }) : null;
    name ? await user.updateOne({ name }) : null;
    email ? await user.updateOne({ email }) : null;
    age ? await user.updateOne({ age }) : null;
    nationality ? await user.updateOne({ nationality }) : null;
    profileVisibility ? await user.updateOne({ profileVisibility }) : null;

    res.status(200).json("Edited Correctly");
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

// GET USER STATS
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const resetUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await User.findById(idUser);

    await user.updateOne({ friends: [] });
    await user.updateOne({ friendRequests: [] });
    await user.updateOne({ image: "empty" });
    await user.updateOne({ backgroundImage: "empty" });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(45454).json({ e });
  }
};

const putUserWishList = async (req, res) => {
  const { idUser } = req.params;
  const { wishList } = req.body

  await User.findByIdAndUpdate(idUser, { wish_list: wishList });
  res.status(200).json({
    status: "wishList updated",
  });
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
  getUserStats,
  resetUser,
  userGames,
  putUserWishList
};
