const User = require ('../models/User');

const follow = async (req, res) => {

    //Make sure the current user and user being followed are not the same
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          //Make sure current user is trying to follow a new user and update lists accordingly
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { following: req.params.id } });
            res.status(200).send("User successfully followed!");
          } else {
            res.status(403).send("You already follow this user!");
          }
        } catch (err) {
          res.status(500).send(err);
        }
    } else {
        res.status(403).send("You can't follow yourself.");
    }}


const unfollow = async (req, res) => {

    //Make sure the current user and user being unfollowed are not the same
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          //Make sure current user is trying to unfollow a user they follow and update lists accordingly
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { following: req.params.id } });
            res.status(200).send("User successfully unfollowed!");
          } else {
            res.status(403).send("You don't follow this user.");
          }
        } catch (err) {
          res.status(500).send(err);
        }
    } else {
        res.status(403).send("You can't unfollow yourself.");
    }}
    
module.exports.follow = follow;
module.exports.unfollow = unfollow;
