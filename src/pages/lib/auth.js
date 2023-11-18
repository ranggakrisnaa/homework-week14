import { verify } from "jsonwebtoken";

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
    try {
        const { payload } = verify(token, getJwtSecretKey());
        return payload;
    } catch (error) {
        return null;
    }
}
