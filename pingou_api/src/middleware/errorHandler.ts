// src/middleware/errorHandler.ts
// Middleware que captura erros não tratados e retorna resposta padronizada

import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[ERRO]', err.message);
  res.status(500).json({ erro: 'Erro interno do servidor' });
}
