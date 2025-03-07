export const editProfileErrorMessages = {
  nickname: {
    maxLength: "El nombre de usuario no puede tener más de 35 caracteres.",
    invalid: "El nombre de usuario no puede contener caracteres especiales.",
  },
  avatar: {
    invalidType: "El archivo debe ser PNG, JPG, JPEG o WEBP",
    invalidSize: "El tamaño del archivo no puede superar los 1MB",
  },
  getMeError: {
    title: "Error al obtener la información del usuario",
    description:
      "Ocurrió un error al recuperar los detalles del usuario. Por favor, intenta nuevamente más tarde.",
  },
};

export const editProfileToastMessages = {
  success: {
    title: "Perfil editado con éxito",
    description: "Tu perfil ha sido actualizado correctamente.",
  },
  error: {
    title: "Error al editar el perfil",
    description: "Ocurrió un error al actualizar tu perfil.",
  },
};
