export const loginUser = async (email, password) => {
    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log(res);


        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const registerUser = async (name, email, password) => {
    try {
        const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


