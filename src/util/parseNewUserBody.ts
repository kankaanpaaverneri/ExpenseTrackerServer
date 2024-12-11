import { Account } from "../types/types";

export function parseNewUserBody(body: any): Account {
  return {
    userId: body?.userId,
    username: body?.username,
    password: body?.password,
  };
}
