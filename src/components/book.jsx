import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"

const Book = ({ title, author, publiser, year, pages, image }) => {
    return (
        <Box width={"180px"} bgColor={"aqua"}>
            <Image src={`http://localhost:3000/${image}`} priority={true} alt="books" width={180} height={180} />
            <Text>{title}</Text>
        </Box>
    )
}

export default Book