import prisma from "../../../../config/db";
import middleware from "../middleware";

async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const data = await prisma.book.findMany()
            if (!data) {
                res.status(404).json({ message: "Error Not Found" })
            }

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
        }
    }
}

export default handler