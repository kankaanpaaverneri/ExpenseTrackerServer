import { LoginData } from "../types/types";
import { maxUsername, maxPassword } from "./constants";

export function validateLoginData(loginData: LoginData): boolean {
  if (!loginData.username || !loginData.password) {
    return false;
  }

  if (loginData.username.length > maxUsername) {
    return false;
  }

  if (loginData.password.length > maxPassword) {
    return false;
  }

  if (loginData.username.length === 0 || loginData.password.length === 0) {
    return false;
  }
  return true;
}
