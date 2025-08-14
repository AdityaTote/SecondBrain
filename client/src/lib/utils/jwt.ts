import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

interface JWTPayload {
    id: string;
    email: string;
    username: string;
}

export function generateJWT(payload: JWTPayload){
    const secret = process.env.JWT_SECRET || "secret";
    const token = sign(payload, secret, { algorithm: 'HS256' })
    return token;
}