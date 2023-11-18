export const loginUser = async (email, password) => {
    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


