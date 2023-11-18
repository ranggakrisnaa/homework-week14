import bcrypt from "bcrypt";
import prisma from "../../../../config/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            res.status(200).json({ token });
            res.cookies.set({
                name: "token",
                value: token,
                path: "/",
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "User already exists" });
        }
    }

}