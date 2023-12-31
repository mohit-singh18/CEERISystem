const User = require("../models/user");

module.exports = {
  signup: async (req, res) => {
      const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
