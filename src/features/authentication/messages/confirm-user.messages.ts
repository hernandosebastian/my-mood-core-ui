export const confirmUserErrorMessages = {
  username: {
    minLength: "Username must be at least 2 characters.",
    maxLength: "Username cannot be longer than 50 characters.",
    invalidEmail: "Username must be a valid email address.",
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
