export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isStrongPassword = (password) => {
  return password.length >= 6;
};

export const isPhoneNumber = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};