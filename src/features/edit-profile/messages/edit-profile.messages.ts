export const editProfileErrorMessages = {
  nickname: {
    maxLength: "Nickname cannot be longer than 35 characters.",
  },
  avatar: {
    invalidType: "File must be PNG, JPG, JPEG or WEBP",
    invalidSize: "File size cannot exceed 1MB",
  },
  getMeError: {
    title: "Error Retrieving User Information",
    description:
      "An error occurred while fetching the user details. Please try again later.",
  },
};

export const editProfileToastMessages = {
  success: {
    title: "Edit Profile Successful",
    description: "Your profile has been updated successfully.",
  },
  error: {
    title: "Edit Profile Error",
    description: "An error occurred while updating your profile.",
  },
};
