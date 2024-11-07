export const signUpErrorMessages = {
  username: {
    maxLength: "Email cannot be longer than 50 characters.",
    invalidEmail: "Email must be a valid email address.",
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

export const signUpToastMessages = {
  success: {
    title: "Sign Up Successful",
    description:
      "Your account has been created successfully. You can now log in.",
  },
  error: {
    title: "Sign Up Failed",
    description: "There was an error signing up. Please try again.",
  },
};
