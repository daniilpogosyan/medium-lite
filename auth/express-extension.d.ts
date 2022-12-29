import { User } from "../api/schemas";

declare module 'express' {
  interface Request {
    user?: User
  }
}
