export const resendConfirmationCodeErrorMessages = {
  username: {
    maxLength:
      "El correo electrónico no puede ser más largo que 50 caracteres.",
    invalidEmail: "El correo electrónico debe ser una dirección válida.",
  },
};

export const resendConfirmationCodeToastMessages = {
  success: {
    title: "Código enviado",
    description:
      "Se ha enviado un nuevo código de confirmación a tu dirección de correo electrónico.",
  },
  error: {
    title: "Error al enviar el código",
    description:
      "Hubo un error al enviar el código de confirmación. Por favor, inténtalo nuevamente.",
  },
};
