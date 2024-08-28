import { Response, Request } from "express";
const uploadImg = require('../services/geminiService');

export const uploadImgController = async (req: Request, res: Response) => {
  try {
    const savedImage = await uploadImg();
    res.json({
      message: "Image uploaded successfully",
      data: {
        id: savedImage._id,
        name: savedImage.name,
        uri: savedImage.uri,
        mimeType: savedImage.mimeType,
        createdAt: savedImage.createdAt,
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

