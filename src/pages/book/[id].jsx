import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    WrapItem,
    useDisclosure,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useToast,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { deleteBook, getAllBooks, getBookById } from "src/lib/book";
import Layout from "../homepage/layout";
import { useEffect, useRef, useState } from "react";
import AddBook from "src/components/AddBook";
import { useRouter } from "next/router";

export default function DetailBook({ data }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [isLogin, setIsLogin] = useState(null);
    const toast = useToast()
    const cancelRef = useRef()
    const router = useRouter();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    useEffect(() => {
        const token = getCookie("token");
        setIsLogin(token);
    }, []);

    if (!data) {
        <Box
            justifyContent={"center"}
            mt={"200px"}
            alignItems={"center"}
            bgColor={"gray.200"}
            w={"500px"}
            mx={"auto"}
            rounded={"lg"}
            p={"20px"}
            boxShadow={"5px 10px yellow"}
        >
            <Text fontSize={"40px"} color={"black"} align={"center"}>
                DATA IS NOT FOUND!
            </Text>
        </Box>;
    }

    const handleDelete = async () => {
        try {
            const res = await deleteBook(isLogin, data.id);
            router.push("/");
            toast({
                title: 'Book deleted',
                position: 'top',
                description: res.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error)
            const errorMessage = error.response ? error.response.data.message : 'Something went wrong'
            toast({
                title: 'Error',
                position: 'top',
                description: errorMessage,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

    };

    return (
        <Layout>
            <Flex
                bgColor={"#001F54"}
                minH={"100vh"}
                color={"white"}
                justify={"center"}
                pt={"120px"}
                gap={"20px"}
            >
                <Text></Text>
                <Box>
                    <Image src={data?.image} width={300} height={380}></Image>
                </Box>
                <Box>
                    <Text mb={"6px"}>{data.author}</Text>
                    <Text fontSize={'28px'}>{data.title}</Text>
                    <Tabs>
                        <TabList mt={"13px"}>
                            <Tab>Description</Tab>
                            <Tab>Detail</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel w={"380px"}>
                                <Text align={"justify"} fontSize={"18px"}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                                    amet optio sit iste libero magni assumenda eius ut, id a
                                    dolorem dicta inventore molestias recusandae, nobis,
                                    reiciendis excepturi suscipit minima. Eveniet velit eligendi
                                    iusto deserunt earum consequatur. Maxime perspiciatis nisi
                                    expedita earum esse enim ipsam ad, eum porro ea tempore ab
                                    velit molestias deserunt non excepturi ducimus, voluptatibus
                                    veritatis dicta? Illum incidunt officia asperiores sequi
                                    saepe, ratione accusamus temporibus. Maxime aspernatur quam
                                    dicta numquam, accusantium tenetur ex beatae cupiditate alias
                                    assumenda, qui id eos animi? Labore porro soluta culpa quos
                                    aut dignissimos doloremque nisi eveniet accusantium, sunt
                                    harum hic non.
                                </Text>
                            </TabPanel>
                            <TabPanel>
                                <Flex gap={"80px"}>
                                    <Box>
                                        <Box>
                                            <Text fontSize={"13px"}>Title</Text>
                                            <Text fontSize={"26px"}>{data?.title}</Text>
                                        </Box>
                                        <Box mt={"10px"}>
                                            <Text fontSize={"13px"}>Author</Text>
                                            <Text fontSize={"26px"}>{data?.author}</Text>
                                        </Box>
                                        <Box mt={"10px"}>
                                            <Text fontSize={"13px"}>Year</Text>
                                            <Text fontSize={"26px"}>{data?.year}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Text fontSize={"13px"}>Publisher</Text>
                                            <Text fontSize={"26px"}>{data?.publisher}</Text>
                                        </Box>
                                        <Box mt={"10px"}>
                                            <Text fontSize={"13px"}>Pages</Text>
                                            <Text fontSize={"26px"}>{data?.pages}</Text>
                                        </Box>
                                    </Box>
                                </Flex>
                                {isLogin ? (
                                    <Box mt={"20px"}>
                                        <Button colorScheme="yellow" mr={"10px"} onClick={onOpen}>
                                            Edit
                                        </Button>
                                        <AddBook
                                            key={data.id}
                                            initialRef={initialRef}
                                            finalRef={finalRef}
                                            isOpen={isOpen}
                                            onClose={onClose}
                                            edit={true}
                                            {...data}
                                        />
                                        <Button colorScheme="red" onClick={onDeleteOpen}>
                                            Delete
                                        </Button>
                                        <AlertDialog
                                            isOpen={isDeleteOpen}
                                            leastDestructiveRef={cancelRef}
                                            onClose={onDeleteClose}
                                        >
                                            <AlertDialogOverlay>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                        Delete Book
                                                    </AlertDialogHeader>

                                                    <AlertDialogBody>
                                                        Are you sure? You can't undo this action afterwards.
                                                    </AlertDialogBody>

                                                    <AlertDialogFooter>
                                                        <Button ref={cancelRef} onClick={onDeleteClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={handleDelete}
                                                            ml={3}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialogOverlay>
                                        </AlertDialog>
                                    </Box>
                                ) : (
                                    ""
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <WrapItem></WrapItem>
                </Box>
            </Flex>
        </Layout>
    );
}

export async function getStaticPaths() {
    try {
        const token = getCookie("token");
        const data = await getAllBooks(token);

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
        const token = getCookie("token");
        const data = await getBookById(id, token);

        return { props: { data: data.data } };
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return { props: { data: null } };
    }
}
