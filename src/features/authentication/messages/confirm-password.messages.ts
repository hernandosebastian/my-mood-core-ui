export const confirmPasswordErrorMessages = {
  username: {
    maxLength: "Email cannot be longer than 50 characters.",
    invalidEmail: "Email must be a valid email address.",
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

export const confirmPasswordToastMessages = {
  success: {
    title: "Password Confirmed",
    description:
      "Your password has been successfully confirmed. You can now log in.",
  },
  error: {
    title: "Confirmation Failed",
    description:
      "There was an error confirming your password. Please try again.",
  },
};
