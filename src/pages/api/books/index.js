import prisma from "../../../../config/db";
import upload from "../multer";

export const config = {
    api: {
        bodyParser: false
    }
}

const Multer = upload.single('file');

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
        Multer(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send(err.message);
            }
            const filePath = req.file.path;
            const filename = filePath.replace(/^public\//, '/');

            const { title, author, publisher, year, pages } = req.body;
            try {
                const book = await prisma.book.create({
                    data: {
                        title,
                        author,
                        publisher,
                        year: parseInt(year),
                        pages: parseInt(pages),
                        image: filename,
                    },
                });
                res.status(201).json({ message: "Book Created Successfully", book });
            } catch (error) {
                console.log(error);
                res.status(400).json({ message: "Book already exists" });
            }
        })
    }

}

export default handler