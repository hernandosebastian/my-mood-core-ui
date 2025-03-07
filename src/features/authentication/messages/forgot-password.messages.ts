export const forgotPasswordErrorMessages = {
  username: {
    maxLength:
      "El correo electrónico no puede ser más largo que 50 caracteres.",
    invalidEmail: "El correo electrónico debe ser una dirección válida.",
  },
};

export const forgotPasswordToastMessages = {
  success: {
    title: "Solicitud de Restablecimiento de Contraseña",
    description:
      "Se ha enviado un enlace para restablecer la contraseña a tu dirección de correo electrónico.",
  },
  error: {
    title: "Error al Solicitar el Restablecimiento de Contraseña",
    description:
      "Hubo un error al solicitar el restablecimiento de la contraseña. Por favor, inténtalo nuevamente.",
  },
};
