import { Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { getAllBooks, getBookById } from "src/lib/book";

export default function DetailBook({ data }) {
    if (!data || !data.book) {
        return <Box>No data available</Box>;
    }

    return (
        <Box>
            {data.data.map((book) => (
                <ul key={book.id}>
                    <li>{book.title}</li>
                </ul>
            ))}
        </Box>
    );
}

export async function getStaticPaths() {
    try {
        const token = Cookies.get("token");
        console.log(token);
        const res = await fetch(`http://localhost:3000/api/books`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        const paths = data.data.map((book) => ({
            params: { id: String(book.id) },
        }));

        return { paths: paths, fallback: true };
    } catch (error) {
        console.error("Error fetching paths:", error);
        return { paths: [], fallback: true };
    }
}

export async function getStaticProps({ params }) {
    try {
        const { id } = params;
        const token = Cookies.get("token");
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        console.log(data);
        return { props: { data } };
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return { props: { data: null } };
    }
}
