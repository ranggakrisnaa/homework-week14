export const getAllBooks = async () => {
    try {
        const res = await fetch('/api/books')
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}