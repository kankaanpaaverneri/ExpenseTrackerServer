import { User } from "../types/types";

export function parseNewUserBody(body: any): User {
  return {
    userId: body?.userId,
    username: body?.username,
    password: body?.password,
  };
}
