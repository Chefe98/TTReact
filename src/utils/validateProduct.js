export const validateProduct = (product, isEdit = false) => {
  const errors = {};

  if (!product.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!product.price || parseFloat(product.price) <= 0) {
    errors.price = "El precio debe ser mayor que 0";
  }

  if (!product.description?.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!product.category?.trim()) {
    errors.category = "La categoría es obligatoria";
  }

  // La imagen solo es obligatoria en creación
  if (!isEdit) {
    if (!product.file) {
      errors.file = "Debes seleccionar una imagen";
    }
    // Opcional: validar tipo y tamaño
    if (product.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(product.file.type)) {
        errors.file = "Formato no permitido (usa JPG, PNG o WEBP)";
      }
      if (product.file.size > 2 * 1024 * 1024) {
        errors.file = "La imagen no debe superar los 2MB";
      }
    }
  } else {
    // En edición, si no hay archivo nuevo, debe existir una imagen actual
    if (!product.file && !product.image) {
      errors.file = "El producto debe tener una imagen (actual o nueva)";
    }
  }

  return errors;
};