import prisma from "../../../../config/db";
import upload from "../multer";


export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {
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
        upload.single('file')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send(err.message);
            }
            const filePath = req.file ? req.file.filename : '';
            console.log(filePath);
            const url = `http://localhost:3000/${filePath}`;

            const { title, author, publisher, year, pages } = req.body
            if (!title || !author || !publisher || !year || !pages) {
                return res.status(400).json({ message: "Value Field is Null" })
            }
            try {
                const book = await prisma.book.create({
                    data: {
                        title,
                        author,
                        publisher,
                        year: parseInt(year),
                        pages: parseInt(pages),
                        image: url
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
