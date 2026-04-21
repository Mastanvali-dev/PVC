export const validateUser = async (phone, password) => {
  const validPhone = "8179676982";
  const validPassword = "8179676982";
  
  if (phone === validPhone && password === validPassword) {
    return { id: "admin", phone, name: "Admin User" };
  }
  
  return null;
};
