import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
const registerUser = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  try {
    const { name, email, password } = req.body;

    //Verify the data
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //Verify email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    //validating strong password
    if (password.length < 8) {
      return res.json({ success: "false", message: "Invalid Password" });
    }

    //check if email is already present
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exist. Please Log in",
      });
    }
    //hash the password using bcrpt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //now save the user to the database
    const userData = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    //Now generate a token with this data
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      secret,
      { expiresIn: "30d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const secret = process.env.JWT_SECRET;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }
    //compare the pass
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        secret,
        { expiresIn: "30d" }
      );
      res.json({ success: true, message: "Logged in successfully", token });
    } else {
      return res.json({ success: false, message: "Password Incorrect" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export { registerUser, loginUser };
