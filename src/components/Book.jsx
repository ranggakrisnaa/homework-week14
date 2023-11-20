import { Box, Flex, Text, Image } from "@chakra-ui/react"
const Book = ({ title, author, publiser, year, pages, image }) => {
    return (
        <Box width={"180px"} bgColor={"aqua"}>
            <Image src={image ? image : ""} alt="books" width={180} height={180} />
            <Text>{title}</Text>
        </Box>
    )
}

export default Book