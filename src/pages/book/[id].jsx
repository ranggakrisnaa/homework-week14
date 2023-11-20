import { Box, Image, Text } from "@chakra-ui/react";
import { getCookie } from 'cookies-next';
import { getAllBooks, getBookById } from "src/lib/book";
import Layout from "../homepage/layout";

export default function DetailBook({ data }) {

    if (!data) {
        return <Box>No data available</Box>;
    }

    return (
        <Layout>
            <Box>
                <Text>{data.title}</Text>
                <Text>{data.author}</Text>
                <Text>{data.year}</Text>
                <Text>{data.publisher}</Text>
                <Text>{data.page}</Text>
                <Image src={data?.image} width={300} height={300}></Image>
            </Box>
        </Layout>
    );
}

export async function getStaticPaths() {
    try {
        const token = getCookie('token');
        const data = getAllBooks(token)
        // const res = await fetch(`http://localhost:3000//api/books`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });

        // const data = await res.json();

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
        const token = getCookie('token');

        const data = await getBookById(id, token)
        // const res = await fetch(`http://localhost:3000/api/books/${id}`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });
        // const data = await res.json();

        return { props: { data: data.data } };
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return { props: { data: null } };
    }
}
