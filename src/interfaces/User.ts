import { Document } from "mongoose";

interface User extends Document {
  username: string;
  kideId: string;
  admin: boolean;
  createdAt: Date;
}

interface OutputUser {
  id: string;
  username: string;
  kideId: string;
  admin: boolean;
  createdAt: Date;
}
interface TestUser {
  id?: string;
  username?: string;
  kideId?: string;
  admin?: boolean;
  createdAt?: Date;
}

interface TokenAndUser {
  token: string;
  user: OutputUser;
}

export { User, OutputUser, TokenAndUser, TestUser };
