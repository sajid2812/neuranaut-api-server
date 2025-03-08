import "dotenv/config";

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const PORT = process.env.PORT as string;
