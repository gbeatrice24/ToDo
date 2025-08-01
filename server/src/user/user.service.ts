import User from "./user.model"
import bcrypt from "bcrypt";

// user login 
export async function loginUserService(email: string, password: string) {
    const user = await User.findOne({ email });
    

    const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: "Invalid email or password" });
        }
    
        res.status(200).json({ message: "Login successful", user });
}