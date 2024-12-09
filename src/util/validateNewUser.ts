const maxUsername = 20;
const maxPassword = 255;

export const validateNewUser = (
  userId: number,
  username: string,
  password: string,
) => {
  if (!userId || !username || !password) {
    return false;
  }

  if (Number.isNaN(Number(userId))) {
    return false;
  }

  if (username.length > maxUsername || username.length === 0) {
    return false;
  }

  if (password.length > maxPassword || password.length === 0) {
    return false;
  }
  return true;
};
