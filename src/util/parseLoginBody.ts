import { LoginData } from "../types/types";

export function parseLoginBody(body: any): LoginData {
  return {
    username: body?.username,
    password: body?.password,
  };
}
