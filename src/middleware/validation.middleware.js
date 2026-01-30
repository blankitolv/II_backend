import mongoose from "mongoose";

export const validateMongoId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: `Parameter '${paramName}' is required.`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: `Invalid format for parameter '${paramName}'.`,
      });
    }

    next();
  };
};
