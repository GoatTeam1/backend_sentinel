import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "default_secret_key";

export const generateToken = (userId: string, name: string) => {
    const payload = { id: userId, name };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, secretKey) as { id: string };
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
}