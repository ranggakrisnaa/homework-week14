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
    token,
}, formData) => {
    try {
        formData.append('title', title);
        formData.append('author', author);
        formData.append('publisher', publisher);
        formData.append('year', year);
        formData.append('pages', pages);

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

export const updateBook = async (id, { title,
    author,
    publisher,
    year,
    pages,
    token,
}, formData) => {
    try {
        console.log(id);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('publisher', publisher);
        formData.append('year', year);
        formData.append('pages', pages);

        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "PUT",
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
}
export const deleteBook = async (token, id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "DELETE",
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
} 