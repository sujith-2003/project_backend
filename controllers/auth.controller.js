import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Token from "../models/token.model.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   LOGIN (JWT ONLY)
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES || "1d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   LOGOUT (CLIENT SIDE)
========================= */
export const logout = async (req, res) => {
  try {
    // JWT logout handled on client by removing token
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   VERIFY SESSION
========================= */
export const verify = async (req, res) => {
  try {
    // req.userId must be set by auth middleware
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    res.json({ user });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
