import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";

// user signup
export async function signupUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("megvan");
      return res.status(409).json("User already exists");
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json("Signup successful");
  } catch (err) {
    res.status(500).json(err);
  }
}

// user login
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
}
