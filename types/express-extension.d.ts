import { users } from "@prisma/client";

declare module 'express' {
  interface Request {
    user?: users
  }
}
