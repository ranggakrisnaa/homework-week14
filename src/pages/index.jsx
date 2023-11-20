import { useEffect, useState } from 'react'
import { getAllBooks } from '../lib/book'
import Layout from './homepage/layout'
import { Box, Flex, Text } from '@chakra-ui/react'
import Book from 'src/components/Book'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token")

        const fetchData = async () => {
            try {
                const booksData = await getAllBooks(token);
                setData(booksData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <Box w={"100vw"} pb={"50px"} bgColor={"#001F54"} color={"white"}>
                <Text fontWeight={"extrabold"} fontSize={"42px"} align={"center"} pt={"50px"} textShadow='2px 2px #540b0e'>Trending Books in BookVerseHub</Text>
                <Flex flexWrap={"wrap"} justify={"center"} mt={"30px"} gap={"30px"}>
                    {data?.data.map(book => (
                        <Link href={`/book/${book.id}`}>
                            <Book key={book.id} {...book} />
                        </Link>
                    ))}
                </Flex>
            </Box>
        </Layout>
    );
};

export default Home;
