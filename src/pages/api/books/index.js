import prisma from "../../../../config/db";

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
    } else if (req.method === "POST") {
        const { title, author, publisher, year, pages } = req.body;
        try {
            const book = await prisma.book.create({
                data: {
                    title,
                    author,
                    publisher,
                    year: parseInt(year),
                    pages: parseInt(pages),
                    // image: req.file.path,
                },
            });
            res.status(201).json({ book });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Book already exists" });
        }
    }
}

export default handler