import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { createBook } from 'src/lib/book'

const AddBook = ({ initialRef, finalRef, isOpen, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const titleRef = useRef()
    const authorRef = useRef()
    const publisherRef = useRef()
    const yearRef = useRef()
    const pageRef = useRef()
    const router = useRouter()

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    console.log(selectedFile);

    const handleSubmit = async () => {
        let bookData = {
            title: titleRef.current.value,
            author: authorRef.current.value,
            publisher: publisherRef.current.value,
            year: yearRef.current.value,
            pages: pageRef.current.value,
        }

        const token = localStorage.getItem("token") || getCookie("token")

        if (token) {
            bookData = {
                ...bookData,
                token
            }
        }

        const formData = new FormData()
        try {
            const res = await createBook(bookData, formData)
            setSelectedFile("")
            alert("book created successfully");
            router.reload("/")
            onClose()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your books</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>title</FormLabel>
                        <Input ref={titleRef} placeholder='First name' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>author</FormLabel>
                        <Input ref={authorRef} placeholder='Last name' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>publiser</FormLabel>
                        <Input ref={publisherRef} placeholder='Last name' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>year</FormLabel>
                        <Input type='number' ref={yearRef} placeholder='Last name' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>page</FormLabel>
                        <Input type='number' ref={pageRef} placeholder='Last name' />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>image</FormLabel>
                        <Input type='file' name='file' onChange={handleFileChange} placeholder='Last name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddBook