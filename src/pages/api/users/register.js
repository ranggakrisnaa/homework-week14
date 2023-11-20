import bcrypt from "bcrypt";
import prisma from "../../../../config/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            res.status(201).json({ user });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "User already exists" });
        }
    }

}