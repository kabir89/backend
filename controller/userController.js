const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const userData = req.body; // Get the validated data
    const user = await User.create(userData); // Create a new user
    return res.status(201).json(user); // Respond with the created user
  } catch (err) {
    // If it's a validation error, let the error handler handle it
    return res.status(400).json({ error: "Failed to create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
