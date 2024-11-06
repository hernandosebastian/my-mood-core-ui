export const logInErrorMessages = {
  username: {
    minLength: "Username must be at least 2 characters.",
    maxLength: "Username cannot be longer than 50 characters.",
    invalidEmail: "Username must be a valid email address.",
  },
  password: {
    minLength: "Password must be at least 8 characters long.",
    maxLength: "Password cannot be longer than 50 characters.",
    uppercase: "Password must contain at least one uppercase letter.",
    lowercase: "Password must contain at least one lowercase letter.",
    number: "Password must contain at least one number.",
    specialChar:
      "Password must contain at least one special character (e.g., !, @, #, $, etc.).",
  },
};

export const logInToastMessages = {
  success: {
    title: "Login Successful",
    description: "You have successfully logged in. Welcome back!",
  },
  error: {
    title: "Login Failed",
    description:
      "There was an error logging in. Please check your credentials and try again.",
  },
};
