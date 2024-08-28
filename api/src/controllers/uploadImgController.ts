import { Response, Request } from "express";
const uploadImg = require('../services/geminiService');

export const uploadImgController = async (req: Request, res: Response) => {
  try {
    const response = await uploadImg();
    res.json({ message: "File processed successfully", data: response });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

