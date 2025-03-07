export const confirmPasswordErrorMessages = {
  username: {
    maxLength:
      "El correo electrónico no puede ser más largo que 50 caracteres.",
    invalidEmail: "El correo electrónico debe ser una dirección válida.",
  },
  newPassword: {
    minLength: "La nueva contraseña debe tener al menos 8 caracteres.",
    maxLength: "La nueva contraseña no puede ser más larga que 50 caracteres.",
    uppercase:
      "La nueva contraseña debe contener al menos una letra mayúscula.",
    lowercase:
      "La nueva contraseña debe contener al menos una letra minúscula.",
    number: "La nueva contraseña debe contener al menos un número.",
    specialChar:
      "La nueva contraseña debe contener al menos un carácter especial (por ejemplo, !, @, #, $, etc.).",
  },
  confirmPassword: {
    mismatch: "Las contraseñas no coinciden.",
  },
  code: {
    length: "El código debe tener exactamente 6 dígitos.",
    digitsOnly: "El código debe contener solo dígitos.",
  },
};

export const confirmPasswordToastMessages = {
  success: {
    title: "Contraseña Confirmada",
    description:
      "Tu contraseña ha sido confirmada con éxito. Ahora puedes iniciar sesión.",
  },
  error: {
    title: "Error al Confirmar",
    description:
      "Ocurrió un error al confirmar tu contraseña. Por favor, inténtalo nuevamente.",
  },
};
