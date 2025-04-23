import bcrypt from 'bcryptjs';
export const hashText = async (text: string, times: number) => {
  return await bcrypt.hash(text, times);
}