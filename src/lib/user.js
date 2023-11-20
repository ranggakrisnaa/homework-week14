import { setCookie } from "cookies-next";

export const loginUser = async (email, password) => {
    try {
        const res = await fetch('http://localhost:3000/api/users/login', {
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


export const registerUser = async (name, email, password) => {
    try {
        const res = await fetch('http://localhost:3000/api/users/register', {
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


