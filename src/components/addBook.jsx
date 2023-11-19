import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { createBook } from 'src/lib/book'

const AddBook = ({ initialRef, finalRef, isOpen, onClose }) => {
    const titleRef = useRef()
    const authorRef = useRef()
    const publisherRef = useRef()
    const yearRef = useRef()
    const pageRef = useRef()
    const imageRef = useRef()
    const router = useRouter()

    const handleSubmit = async () => {
        let bookData = {
            title: titleRef.current.value,
            author: authorRef.current.value,
            publisher: publisherRef.current.value,
            year: yearRef.current.value,
            pages: pageRef.current.value,
            image: imageRef.current.value
        }

        const token = localStorage.getItem("token")

        if (token) {
            bookData = {
                ...bookData,
                token
            }
        }

        console.log(bookData);

        try {
            await createBook(bookData)

            alert("book created successfully");
            router.reload("/dashboard")
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
                        <Input type='file' ref={imageRef} placeholder='Last name' />
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