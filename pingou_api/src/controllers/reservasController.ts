// src/controllers/reservasController.ts
import { Request, Response } from 'express';
import { db } from '../database/db';
import { CriarReservaBody } from '../models/types';

// POST /reservas
export async function criarReserva(
  req: Request<{}, {}, CriarReservaBody>,
  res: Response
): Promise<void> {
  const { meta_id, valor } = req.body;

  if (!meta_id || !valor) {
    res.status(400).json({ erro: 'meta_id e valor são obrigatórios' });
    return;
  }

  if (valor <= 0) {
    res.status(400).json({ erro: 'O valor deve ser maior que zero' });
    return;
  }

  const meta = await db.execute({
    sql: 'SELECT id FROM metas WHERE id = ?',
    args: [meta_id],
  });

  if (meta.rows.length === 0) {
    res.status(404).json({ erro: 'Meta não encontrada' });
    return;
  }

  // Insere reserva e atualiza valor_atual em batch (transação)
  await db.batch([
    {
      sql: 'INSERT INTO reservas (meta_id, valor) VALUES (?, ?)',
      args: [meta_id, valor],
    },
    {
      sql: 'UPDATE metas SET valor_atual = valor_atual + ? WHERE id = ?',
      args: [valor, meta_id],
    },
  ], 'write');

  res.status(201).json({ mensagem: 'Reserva registrada com sucesso!' });
}

// GET /reservas/:meta_id
export async function listarReservas(
  req: Request<{ meta_id: string }>,
  res: Response
): Promise<void> {
  const result = await db.execute({
    sql: 'SELECT * FROM reservas WHERE meta_id = ? ORDER BY criado_em DESC',
    args: [Number(req.params.meta_id)],
  });

  res.json(result.rows);
}
