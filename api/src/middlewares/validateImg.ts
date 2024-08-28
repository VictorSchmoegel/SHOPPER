import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const uploadImgSchema = Joi.object({
  image: Joi.string().pattern(/^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/).required(),
  customer_code: Joi.string().min(3).required(),
  measure_datetime: Joi.date().iso().required(),
  measure_type: Joi.string().valid("WATER", "GAS").required(),
});

export const validadeImg = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = uploadImgSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: `Validation error: ${error.details[0].message}`
    });
  }
  next();
};