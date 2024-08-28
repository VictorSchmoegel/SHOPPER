import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const uploadImgSchema = Joi.object({
  mimeType: Joi.string().valid("image/jpeg", "image/png", "image/gif").required(),
  displayName: Joi.string().min(3).required(),
  base64Data: Joi.string().pattern(/^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/).required(),
});

export const validadeImg = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = uploadImgSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
  }
  next();
};