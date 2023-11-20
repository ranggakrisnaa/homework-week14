import { Box, Button, Checkbox, Flex, FormControl, FormHelperText, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import picture from '../../public/image1.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { loginUser } from '../lib/user'
import { cookies } from 'next/headers'
import Link from 'next/link'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    console.log(email);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await loginUser(email, password)
            // localStorage.setItem('token', res.token)
            const oneDay = 24 * 60 * 60 * 1000
            cookies().set('token', res.token, { expires: Date.now() - oneDay }) && localStorage.setItem('token', res.token)

            alert('success login')
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box width={"100vw"}>
            <Flex align={"center"} justify={"center"} h={"100vh"}>
                <Box border={"solid"} padding={"20px"} w={"600px"} rounded={"6"}>
                    <Flex align={"center"} justify={"center"} flexDir={"column"}>
                        <Image src={picture} width={90} priority={true} alt='books' />
                        <Text mt={"5px"} fontSize={"32px"} align={"center"} fontWeight={"bold"}>Welcome to BooksVerseHub</Text>
                    </Flex>
                    <Text fontSize={"28px"} mt={"10px"} align={"center"} fontWeight={"bold"}>Sign In to your account</Text>
                    <FormControl mt={"20px"}>
                        <Box>
                            <FormLabel>Email address</FormLabel>
                            <Input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box mt={"10px"}>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Flex mt={"10px"} justify={"space-between"}>
                            <Checkbox defaultChecked>Remember me</Checkbox>
                            <Text><Link href={`/register`}>Register an account?</Link></Text>
                        </Flex>
                        <Box mt={"20px"}>
                            <Button w={"full"} colorScheme='blue' onClick={handleSubmit}>sign in</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Flex>
        </Box>
    )
}



export default Login