const User = require("../models/User");
const bcrypt = require("bcryptjs");

const follow = async (req, res) => {
  //Make sure the current user and user being followed are not the same
  if (req.user._id !== req.body.user_id) {
    try {
      const user = await User.findById(req.body.user_id);
      const currentUser = await User.findById(req.user._id);
      //Make sure current user is trying to follow a new user and update lists accordingly
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { following: user._id } });
        res.status(200).send("User successfully followed!");
      } else {
        res.status(403).send("You already follow this user!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send("You can't follow yourself.");
  }
};

const unfollow = async (req, res) => {
  //Make sure the current user and user being unfollowed are not the same
  if (req.body.user_id !== req.user._id) {
    try {
      const user = await User.findById(req.body.user_id);
      const currentUser = await User.findById(req.user._id);
      //Make sure current user is trying to unfollow a user they follow and update lists accordingly
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { following: user._id } });
        res.status(200).send("User successfully unfollowed!");
      } else {
        res.status(403).send("You don't follow this user.");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403).send("You can't unfollow yourself.");
  }
};

const editProfile = async (req, res) => {
    //If the pw is being updated, hash it before storing in DB
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).send(err);
      }
    }

    //Check if email already exists
    if (req.body.email) {
      try {
        const email_match = await User.findOne({ email: req.body.email });

        if (email_match && !email_match._id.equals(req.user._id)) {
          return res.status(400).send("Email already exists");
        }
      } catch (err) {
        return res.status(500).send(err);
      }
    }

    //Update user info
    try {
      const updated_user = await User.findByIdAndUpdate(req.user._id, {
        $set: req.body,
      }, {new: true});
      res.status(200).send({message:"Account successfully updated!", user: updated_user});
    } catch (err) {
      return res.status(500).send(err);
    }
  } 

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const bookmatesIds = users.map((user) => user._id)

    return res.status(200).send(bookmatesIds)
  } catch (error) {
    return res.status(400).send(error);    
  }

}

const getProfile = async (req, res) => {
  return res.status(200).send(req.user);
}

module.exports.follow = follow;
module.exports.unfollow = unfollow;
module.exports.editProfile = editProfile;
module.exports.getAllUsers = getAllUsers;
module.exports.getProfile = getProfile;