import bcrypt from 'bcryptjs';

export const checkPassword = (passwordToCheck: string, password:string) => {
  return bcrypt.compare(passwordToCheck, password);
}