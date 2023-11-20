import prisma from "../../../../config/db";

async function handler(req, res) {
    if (req.method === "PUT") {
        const { id } = req.query
        const { title, author, publisher, year, pages, image } = req.body
        try {
            const book = await prisma.book.update({
                where: { id: Number(id) },
                data: {
                    title,
                    author,
                    publisher,
                    year,
                    pages,
                    image
                },
            });
            if (!book) {
                res.status(404).json({ message: "Error Not Found" })
            }

            res.status(200).json({ message: "Book Updated Successfully" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Something went wrong" })
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query
        try {
            await prisma.book.delete({
                where: { id: Number(id) },
            });
            res.json({ message: "Book Deleted Successfully" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Something went wrong" })
        }

    } else if (req.method === "GET") {
        const { id } = req.query;
        try {
            const book = await prisma.book.findUnique({
                where: { id: Number(id) },
            });
            res.json({ data: book });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Something went wrong" });
        }
    }

}

export default handler