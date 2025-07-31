import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";

// user signup
export async function signupUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.insertOne({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400).json({ error: "Signup failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err });
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
