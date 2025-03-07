export const logInErrorMessages = {
  username: {
    maxLength:
      "El correo electrónico no puede ser más largo que 50 caracteres.",
    invalidEmail: "El correo electrónico debe ser una dirección válida.",
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
};

export const logInToastMessages = {
  success: {
    title: "Inicio de sesión exitoso",
    description: "Has iniciado sesión correctamente. ¡Bienvenido de nuevo!",
  },
  error: {
    title: "Error al iniciar sesión",
    description:
      "Hubo un error al iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.",
  },
};
