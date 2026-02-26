const express = require("express");

const profileRouter = express.Router();
const validator = require("validator");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + res.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile is updated sucessfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.post("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Enter a strong new Password!");
    }
    const user = req.user;
    user.password = newPassword;
    user.save();
    res.send("Password updated sucessfully");
  } catch (err) {
    res.status.send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
