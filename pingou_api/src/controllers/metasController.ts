// src/controllers/metasController.ts
import { Request, Response } from 'express';
import { db } from '../database/db';
import { CriarMetaBody } from '../models/types';

// POST /metas
export async function criarMeta(
  req: Request<{}, {}, CriarMetaBody>,
  res: Response
): Promise<void> {
  const { usuario_id, nome, emoji = '🎯', valor_alvo } = req.body;

  if (!usuario_id || !nome || !valor_alvo) {
    res.status(400).json({ erro: 'usuario_id, nome e valor_alvo são obrigatórios' });
    return;
  }

  const usuario = await db.execute({
    sql: 'SELECT id FROM usuarios WHERE id = ?',
    args: [usuario_id],
  });

  if (usuario.rows.length === 0) {
    res.status(404).json({ erro: 'Usuário não encontrado' });
    return;
  }

  const result = await db.execute({
    sql: 'INSERT INTO metas (usuario_id, nome, emoji, valor_alvo) VALUES (?, ?, ?, ?)',
    args: [usuario_id, nome.trim(), emoji, valor_alvo],
  });

  res.status(201).json({
    id: Number(result.lastInsertRowid),
    usuario_id,
    nome: nome.trim(),
    emoji,
    valor_alvo,
    valor_atual: 0,
  });
}

// GET /metas/:id
export async function buscarMeta(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const result = await db.execute({
    sql: 'SELECT * FROM metas WHERE id = ?',
    args: [Number(req.params.id)],
  });

  if (result.rows.length === 0) {
    res.status(404).json({ erro: 'Meta não encontrada' });
    return;
  }

  res.json(result.rows[0]);
}

// GET /metas/usuario/:usuario_id
export async function listarMetasDoUsuario(
  req: Request<{ usuario_id: string }>,
  res: Response
): Promise<void> {
  const result = await db.execute({
    sql: 'SELECT * FROM metas WHERE usuario_id = ? ORDER BY criado_em DESC',
    args: [Number(req.params.usuario_id)],
  });

  res.json(result.rows);
}
