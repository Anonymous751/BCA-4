import bcrypt from "bcryptjs";

// Hash the password before saving
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // 10 rounds is standard
  return await bcrypt.hash(password, salt);
};

// Compare entered password with hashed one
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
