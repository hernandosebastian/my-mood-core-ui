export const signUpErrorMessages = {
  username: {
    minLength: "Username must be at least 2 characters.",
    maxLength: "Username cannot be longer than 50 characters.",
    invalidChars:
      "Username can only contain letters, numbers, dashes, and underscores.",
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

