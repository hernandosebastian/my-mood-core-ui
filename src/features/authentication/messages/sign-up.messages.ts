export const signUpErrorMessages = {
  username: {
    maxLength:
      "El correo electrónico no puede ser más largo que 50 caracteres.",
    invalidEmail: "El correo electrónico debe ser una dirección válida.",
  },
  nickname: {
    maxLength: "El apodo no puede ser más largo que 35 caracteres.",
    invalid: "El apodo no puede contener espacios ni caracteres especiales.",
  },
  password: {
    minLength: "La contraseña debe tener al menos 8 caracteres.",
    maxLength: "La contraseña no puede ser más larga que 50 caracteres.",
    uppercase: "La contraseña debe contener al menos una letra mayúscula.",
    lowercase: "La contraseña debe contener al menos una letra minúscula.",
    number: "La contraseña debe contener al menos un número.",
    specialChar:
      "La contraseña debe contener al menos un carácter especial (por ejemplo, !, @, #, $, etc.).",
  },
  confirmPassword: {
    mismatch: "Las contraseñas no coinciden",
  },
};

export const signUpToastMessages = {
  success: {
    title: "Registro Exitoso",
    description:
      "Tu cuenta ha sido creada exitosamente. Verifica tu correo electrónico para activar tu cuenta.",
  },
  error: {
    title: "Error en el Registro",
    description:
      "Hubo un error al registrarte. Por favor, inténtalo nuevamente.",
  },
};
