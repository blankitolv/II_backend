import mongoose from "mongoose";

/**
 * Middleware para validar un parámetro de la URL como un ObjectId válido de Mongoose.
 * @param {string} paramName - El nombre del parámetro a validar (ej. 'cid', 'pid').
 */
export const validateMongoId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
      return res.status(400).json({ 
        status: "error",
        message: `Parameter '${paramName}' is required.` 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        status: "error",
        message: `Invalid format for parameter '${paramName}'.` 
      });
    }

    next(); // Si la validación es exitosa, continúa al siguiente middleware o controlador.
  };
};
