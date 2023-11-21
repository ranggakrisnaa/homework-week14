import prisma from "../../../../config/db";
import upload from "../multer";


export const config = {
    api: {
        bodyParser: false,
    },
}


export default async function handler(req, res) {
    if (req.method === "PUT") {
        let url

        upload.single('file')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send(err.message);
            }

            if (req.file) {
                const filePath = req.file.filename;
                url = `http://localhost:3000/${filePath}`;
            }

            const { id } = req.query
            const { title, author, publisher, year, pages } = req.body

            try {
                const data = await prisma.book.findFirst({ where: { id: Number(id) } })

                const book = await prisma.book.update({
                    where: { id: Number(id) },
                    data: {
                        title: title || data.title,
                        author: author || data.author,
                        publisher: publisher || data.publisher,
                        year: parseInt(year) || parseInt(data.year),
                        pages: parseInt(pages) || parseInt(data.pages),
                        image: url || data.image
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
        })
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