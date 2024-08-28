import { Response, Request } from "express";
import { validateLeitura } from "../middlewares/leitura";
import { validadeImg } from "../middlewares/validateImg";
import Leitura from "../model/leituraModel";
const uploadImg = require('../services/geminiService');

export const uploadImgController = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  try {
    const uploadResult = await uploadImg(image);

    const novaLeitura = new Leitura({
      customer_code,
      mes: new Date(measure_datetime).getMonth() + 1,
      measure_type,
      measure_value: uploadResult.measure_value,
      imageUri: uploadResult.image_url,
      mimeType: "image/jpeg", // Ajustar conforme o tipo real da imagem
    });
    await novaLeitura.save();

    res.status(200).json({
      image_url: uploadResult.image_url,
      measure_value: uploadResult.measure_value,
      measure_uuid: uploadResult.measure_uuid
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao processar a leitura" });
  }
};

