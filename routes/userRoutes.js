const express = require("express");
const validateUser = require("../middleware/userValidation");
const { createUser } = require("../controller/userController");

const router = express.Router();

router.post("/users", validateUser, createUser);

module.exports = router;
