const User = require ('../models/User');

const follow = async (req, res) => {
    res.send('Followed')
}

const unfollow = async (req, res) => {
    res.send('Unfollowed')
}

module.exports.follow = follow;
module.exports.unfollow = unfollow;
