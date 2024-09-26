export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  // Regular expressions for each condition
  const hasLetter = /[a-zA-Z]/;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  // Checking the password against all the conditions
  if (!hasLetter.test(password)) {
    return false;
  }
  if (!hasNumber.test(password)) {
    return false;
  }
  if (!hasSpecialChar.test(password)) {
    return false;
  }

  return true;
};
