import { useEffect, useState } from "react";
import { getAllBooks } from "../lib/book";
import Layout from "./homepage/layout";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import Book from "src/components/Book";
import Link from "next/link";
import { getCookie } from "cookies-next";

const Home = () => {
    const [data, setData] = useState(null);


    useEffect(() => {
        const token = getCookie("token");

        const fetchData = async () => {
            try {
                const booksData = await getAllBooks(token);
                setData(booksData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const NotFoundPage = () => {
        return (
            <Box
                justifyContent={"center"}
                mt={"200px"}
                alignItems={"center"}
                bgColor={"gray.200"}
                w={"500px"}
                mx={"auto"}
                rounded={"lg"}
                p={"20px"}
                boxShadow={'5px 10px yellow'}
            >
                <Text fontSize={"40px"} color={"black"} align={"center"}>
                    Books Is Not Found!
                    Please Create Book First!
                </Text>
            </Box>
        );
    };

    return (
        <Layout>
            <Box
                minW={"100vw"}
                minH={"100vh"}
                pb={"50px"}
                bgColor={"#001F54"}
                color={"white"}
            >
                <Text
                    fontWeight={"extrabold"}
                    fontSize={"42px"}
                    align={"center"}
                    pt={"50px"}
                    textShadow="2px 2px #540b0e"
                >
                    {data ? 'Trending Books in BookVerseHub' : ''}
                </Text>
                <Flex flexWrap={"wrap"} justify={"center"} mt={"30px"} gap={"30px"}>
                    {!data ? <NotFoundPage /> : data?.data.map((book) => (
                        <Link key={book.id} href={`/book/${book.id}`}>
                            <Book {...book} />
                        </Link>
                    ))
                    }
                </Flex>
            </Box>
        </Layout >
    );
};

export default Home;
