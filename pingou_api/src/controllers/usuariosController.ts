// src/controllers/usuariosController.ts
import { Request, Response } from 'express';
import { db } from '../database/db';
import { CriarUsuarioBody } from '../models/types';

// POST /usuarios
export async function criarUsuario(
  req: Request<{}, {}, CriarUsuarioBody>,
  res: Response
): Promise<void> {
  const { nome } = req.body;

  if (!nome || nome.trim() === '') {
    res.status(400).json({ erro: 'Nome é obrigatório' });
    return;
  }

  const result = await db.execute({
    sql: 'INSERT INTO usuarios (nome) VALUES (?)',
    args: [nome.trim()],
  });

  res.status(201).json({
    id: Number(result.lastInsertRowid),
    nome: nome.trim(),
  });
}

// GET /usuarios/:id
export async function buscarUsuario(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const result = await db.execute({
    sql: 'SELECT * FROM usuarios WHERE id = ?',
    args: [Number(req.params.id)],
  });

  if (result.rows.length === 0) {
    res.status(404).json({ erro: 'Usuário não encontrado' });
    return;
  }

  res.json(result.rows[0]);
}
