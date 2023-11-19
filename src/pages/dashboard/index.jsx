import { useEffect, useState } from 'react'
import { getAllBooks } from '../../lib/book'
import Layout from './layout'
import { Box, Flex, Text } from '@chakra-ui/react'
import Book from 'src/components/book'
import { useRouter } from 'next/router'

const Dashboard = () => {
    const [data, setData] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        }

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
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
            <Box w={"100vw"} height={"100vh"} bgColor={"#001F54"} color={"white"}>
                <Text fontWeight={"extrabold"} fontSize={"42px"} align={"center"} pt={"50px"} textShadow='2px 2px #540b0e'>Trending Books in BookVerseHub</Text>
                <Flex flexWrap={"wrap"} justify={"center"} mt={"30px"} gap={"30px"}>
                    {data?.data.map(book => (
                        <Book key={book.id} {...book} />
                    ))}
                </Flex>
            </Box>
        </Layout>
    );
};

export default Dashboard;
