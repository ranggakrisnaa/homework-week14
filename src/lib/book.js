export const getAllBooks = async (token) => {
    try {
        console.log(token);
        // const token = localStorage.getItem("token")
        const res = await fetch('/api/books', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getBookById = async (id) => {
    try {
        const res = await fetch(`/api/books/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const createBook = async ({ title, author, publisher, year, pages, image, token }) => {
    try {
        console.log(token);
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, author, publisher, year, pages, image: image.File.name }),
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }

}