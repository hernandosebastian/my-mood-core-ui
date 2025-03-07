export const confirmUserErrorMessages = {
  username: {
    maxLength:
      "El correo electrónico no puede ser más largo que 50 caracteres.",
    invalidEmail: "El correo electrónico debe ser una dirección válida.",
  },
  code: {
    length: "El código debe tener exactamente 6 dígitos.",
    digitsOnly: "El código debe contener solo dígitos.",
  },
};

export const confirmUserToastMessages = {
  success: {
    title: "Usuario Confirmado",
    description: "El usuario ha sido confirmado con éxito.",
  },
  error: {
    title: "Error al Confirmar el Usuario",
    description:
      "Hubo un error al confirmar el usuario. Por favor, inténtalo nuevamente.",
  },
};
