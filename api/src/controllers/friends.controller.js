const User = require("../models/User.js");
require("dotenv").config();

const friendRequest = async (req, res) => {
  const { idSender, idReciver } = req.body;
  const user = await User.findById(idReciver);
  const check = user.friendRequests.filter((x) => x === idSender);
  if (check.length > 0)
    return res
      .status(400)
      .json({ msg: "There is already a pending friend request" });

  const check2 = user.friends.filter((x) => x === idSender);
  if (check2.length > 0)
    return res
      .status(400)
      .json({ msg: "You are already a friend of this user" });

  try {
    await user.updateOne({
      friendRequests: [...user.friendRequests, idSender],
    });
    res.status(200).json({ msg: "Friend request sended!", estado: "prequest" });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};
const cancelFriendRequest = async (req, res) => {
  const { idSender, idReciver } = req.body;
  const user = await User.findById(idReciver);
  const check = user.friendRequests.filter((x) => x === idSender);
  if (check.length > 0) {
    var newArray = [...user.friendRequests];
    newArray = user.friendRequests.filter((x) => x !== idSender);
    try {
      await user.updateOne({
        friendRequests: newArray,
      });
      res.status(200).json({ msg: "Friend request canceled", estado: "nada" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "There is no friend Request to cancel" });
  }
};
const acceptFriend = async (req, res) => {
  const { idSender, idReciver } = req.body;
  const user = await User.findById(idSender);
  const check = user.friendRequests.filter((x) => x === idReciver);
  if (check.length > 0) {
    const check2 = user.friends.filter((x) => x === idSender);
    if (check2 > 0) {
      return res.status(400).json({ msg: "You are already friends" });
    } else {
      try {
        var newArray = [...user.friendRequests];

        newArray = user.friendRequests.filter((x) => x !== idReciver);

        await user.updateOne({
          friendRequests: newArray,
        });

        await user.updateOne({
          friends: [...user.friends, idReciver],
        });

        const Reciver = await User.findById(idReciver);

        await Reciver.updateOne({
          friends: [...Reciver.friends, idSender],
        });

        res
          .status(200)
          .json({ msg: "Friend request Acepted", estado: "friend" });
      } catch (e) {
        console.log(e);
        res.status(400).json(e);
      }
    }
  } else {
    res.status(400).json({ msg: "This user dident send you a Friend Request" });
  }
};
const rejectFriend = async (req, res) => {
  const { idSender, idReciver } = req.body;
  const user = await User.findById(idSender);
  const check = user.friendRequests.filter((x) => x === idReciver);
  if (check.length > 0) {
    try {
      var newArray = [...user.friendRequests];
      newArray = user.friendRequests.filter((x) => x !== idReciver);
      await user.updateOne({
        friendRequests: newArray,
      });
      res.status(200).json({ msg: "Friend request Rejected", estado: "nada" });
    } catch (e) {
      res.status(400).json({ msg: e });
    }
  } else {
    res.status(400).json({ msg: "This user dident send you a Friend Request" });
  }
};
const removeFriend = async (req, res) => {
  const { idSender, idReciver } = req.body;
  const sender = await User.findById(idSender);
  const arraysender = sender.friends.filter((x) => x !== idReciver);
  const reciver = await User.findById(idReciver);
  const arrayreciver = reciver.friends.filter((x) => x !== idSender);
  try {
    await sender.updateOne({
      friends: arraysender,
    });
    await reciver.updateOne({
      friends: arrayreciver,
    });
    res.status(400).json({ msg: "Friend deleted" });
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

const relationship = async (req, res) => {
  const { idSender, idReciver } = req.body;

  try {
    const sender = await User.findById(idSender);
    const reciver = await User.findById(idReciver);
    const check = sender.friends.filter((x) => x === idReciver);
    if (check.length > 0) {
      return res.status(200).json({ estado: "friend" });
    } else {
      const check2 = reciver.friendRequests.filter((x) => x === idSender);
      if (check2.length > 0) {
        return res.status(200).json({ estado: "prequest" });
      } else {
        const check3 = sender.friendRequests.filter((x) => x === idReciver);
        if (check3.length > 0) {
          return res.status(200).json({ estado: "irequest" });
        } else {
          return res.status(200).json({ estado: "nada" });
        }
      }
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const friendList = async (req, res) => {
  const { id } = req.body;
  try {
    const sender = await User.findById(id);
    var newArray = [];

    for (let i = 0; sender.friends.length > i; i++) {
      let user = await User.findById(sender.friends[i]);
      newArray.push([user._id, user.image]);
    }
    res.status(200).json({ msg: "All done", listOfFriends: newArray });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

module.exports = {
  friendRequest,
  cancelFriendRequest,
  acceptFriend,
  rejectFriend,
  relationship,
  friendList,
  removeFriend,
};
