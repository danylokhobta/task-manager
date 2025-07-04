import bcrypt from 'bcryptjs';

export const verifyHash = (input: string, hashed: string) => {
  return bcrypt.compare(input, hashed);
};
