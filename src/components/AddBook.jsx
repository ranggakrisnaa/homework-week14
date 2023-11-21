import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { createBook, updateBook } from 'src/lib/book'

const AddBook = ({ initialRef, finalRef, isOpen, onClose, edit, title, author, publisher, year, pages, image, id }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const toast = useToast()
    const titleRef = useRef()
    const authorRef = useRef()
    const publisherRef = useRef()
    const yearRef = useRef()
    const pageRef = useRef()
    const router = useRouter()

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleSubmit = async () => {
        let bookData = {
            title: titleRef.current.value,
            author: authorRef.current.value,
            publisher: publisherRef.current.value,
            year: yearRef.current.value,
            pages: pageRef.current.value,
        }

        const token = getCookie("token")

        if (token) {
            bookData = {
                ...bookData,
                token
            }
        }

        const formData = new FormData()
        formData.append('file', selectedFile)


        if (edit) {
            try {
                const updatedBookData = { ...bookData }
                const res = await updateBook(id, updatedBookData, formData)
                router.reload()
                onClose()
                toast({
                    title: 'Book updated',
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
        } else {
            try {
                const res = await createBook(bookData, formData)
                setSelectedFile("")
                toast({
                    title: 'Book created',
                    position: 'top',
                    description: res.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                router.reload("/")
                onClose()
            } catch (error) {
                console.log(error);
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
                <ModalHeader>{edit ? 'Edit your books' : 'Create your books'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>title</FormLabel>
                        <Input ref={titleRef} placeholder='title' defaultValue={title} required />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>author</FormLabel>
                        <Input ref={authorRef} placeholder='author' defaultValue={author} required />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>publiser</FormLabel>
                        <Input ref={publisherRef} placeholder='publisher' defaultValue={publisher} required />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>year</FormLabel>
                        <Input type='number' ref={yearRef} placeholder='year' defaultValue={year} required />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>pages</FormLabel>
                        <Input type='number' ref={pageRef} placeholder='pages' defaultValue={pages} required />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>image</FormLabel>
                        <Input type='file' name='file' onChange={handleFileChange} placeholder='image' required />
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