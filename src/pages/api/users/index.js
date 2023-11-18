const prisma = require("../../../../config/db");

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.userId
        try {
            const data = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            res.status(200).json({ data })
        } catch (error) {
            console.log(error);
        }
    }
}