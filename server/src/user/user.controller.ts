import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";

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
