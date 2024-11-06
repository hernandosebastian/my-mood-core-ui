export const confirmPasswordErrorMessages = {
  username: {
    minLength: "Username must be at least 2 characters.",
    maxLength: "Username cannot be longer than 50 characters.",
    invalidChars:
      "Username can only contain letters, numbers, dashes, and underscores.",
  },
  newPassword: {
    minLength: "New password must be at least 8 characters long.",
    maxLength: "New password cannot be longer than 50 characters.",
    uppercase: "New password must contain at least one uppercase letter.",
    lowercase: "New password must contain at least one lowercase letter.",
    number: "New password must contain at least one number.",
    specialChar:
      "New password must contain at least one special character (e.g., !, @, #, $, etc.).",
  },
  code: {
    length: "Code must be exactly 6 digits.",
    digitsOnly: "Code must only contain digits.",
  },
};

