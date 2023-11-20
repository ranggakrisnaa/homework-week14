import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from "react"
import AddBook from "./AddBook"
import { useRouter } from "next/router"

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const [isLogin, setIsLogin] = useState()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLogin(token)
        }
    }, [])

    const logOut = () => {
        setIsLogin(localStorage.removeItem("token"))
        router.push("/")
    }

    return (
        <Flex justify={"space-between"} w={"100vw"} padding={"16px"} bgColor={"#0A1128"} shadow={"md"} align={"center"}>
            <Link href={"/dashboard"}>
                <Flex>
                    <Text color={"white"} fontSize={"26px"} fontWeight={"bold"}>BookVerseHub</Text>
                </Flex>
            </Link>
            <Flex>
                {isLogin ? (
                    <Button size={"md"} mr={"10px"} onClick={onOpen}>create book</Button>
                ) : (
                    <Button size={"md"} mr={"10px"} onClick={() => router.push('/login')}>login</Button>
                )}
                <AddBook initialRef={initialRef} finalRef={finalRef} isOpen={isOpen} onClose={onClose} />
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton isActive={isOpen} as={Button} mr={"10px"} rightIcon={<ChevronDownIcon />}>
                                {isOpen ? 'Close' : 'Profile'}
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem onClick={logOut}>Log Out</MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>
        </Flex >
    )
}

export default Navbar