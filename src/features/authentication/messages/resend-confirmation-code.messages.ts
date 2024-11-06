export const resendConfirmationCodeErrorMessages = {
  username: {
    minLength: "Username must be at least 2 characters.",
    maxLength: "Username cannot be longer than 50 characters.",
    invalidEmail: "Username must be a valid email address.",
  },
};

export const resendConfirmationCodeToastMessages = {
  success: {
    title: "Code Sent",
    description: "A new confirmation code has been sent to your email address.",
  },
  error: {
    title: "Code Sending Failed",
    description:
      "There was an error sending the confirmation code. Please try again.",
  },
};
