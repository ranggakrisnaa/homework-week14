import { Box, Flex, Text, Image } from "@chakra-ui/react"
const Book = ({ title, author, publiser, year, pages, image }) => {
    return (
        <Box width={"220px"} bgColor={"#ffffff"} color={"black"}>
            <Image src={image ? image : ""} alt="books" w={'220px'} h={'280px'} />
            <Text align={'center'} fontWeight={'extrabold'} pt={'5px'}>{title}</Text>
            <Text align={'center'} pb={'6px'}>{author} ({year})</Text>
        </Box>
    )
}

export default Book