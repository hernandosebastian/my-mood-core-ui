export const forgotPasswordErrorMessages = {
  username: {
    minLength: "Username must be at least 2 characters.",
    maxLength: "Username cannot be longer than 50 characters.",
    invalidEmail: "Username must be a valid email address.",
  },
};

export const forgotPasswordToastMessages = {
  success: {
    title: "Password Reset Requested",
    description: "A password reset link has been sent to your email address.",
  },
  error: {
    title: "Password Reset Failed",
    description:
      "There was an error requesting the password reset. Please try again.",
  },
};
