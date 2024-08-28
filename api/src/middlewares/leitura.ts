import { Request, Response, NextFunction } from "express";

import Leitura from "../model/leituraModel";

export const validateLeitura = async (req: Request, res: Response, next: NextFunction) => {
  const { customer_code, measure_datetime, measure_type } = req.body;
  const mes = new Date(measure_datetime).getMonth() + 1;
  try {
    const existingLeitura = await Leitura.findOne({ 
      customer_code, 
      measure_type, 
      mes 
    });

    if (existingLeitura) {
      return res.status(409).json({ 
        error_code: "DOUBLE_REPORT", 
        error_description: "Leitura do mês já realizada" 
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar a leitura" });
  }
}