export const getAllBooks = async (token) => {
    try {
        const res = await fetch("http://localhost:3000/api/books", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getBookById = async (id, token) => {
    try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const createBook = async ({
    title,
    author,
    publisher,
    year,
    pages,
    image,
    token,
}, formData) => {
    try {
        formData.append('title', title);
        formData.append('author', author);
        formData.append('publisher', publisher);
        formData.append('year', year);
        formData.append('pages', pages);
        formData.append('file', image);

        const res = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};