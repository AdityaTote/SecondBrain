import bcrypt from 'bcrypt';

export const genHashPass = async(password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export const compareHashPass = async(password: string, hash: string) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}