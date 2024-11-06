export const confirmUserErrorMessages = {
  username: {
    minLength: "Email must be at least 2 characters.",
    maxLength: "Email cannot be longer than 50 characters.",
    invalidEmail: "Email must be a valid email address.",
  },
  code: {
    length: "Code must be exactly 6 digits.",
    digitsOnly: "Code must only contain digits.",
  },
};

export const confirmUserToastMessages = {
  success: {
    title: "User Confirmed",
    description: "The user has been successfully confirmed.",
  },
  error: {
    title: "User Confirmation Failed",
    description: "There was an error confirming the user. Please try again.",
  },
};
