// src/database/db.ts
// Conexão com SQLite local via @libsql/client (puro JS, sem compilação nativa)

import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DB_PATH ?? './pingou.db';

export const db = createClient({
  url: `file:${dbPath}`,
});

// Cria as tabelas na primeira execução
export async function inicializarBanco(): Promise<void> {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nome      TEXT    NOT NULL,
      criado_em TEXT    DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS metas (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id  INTEGER NOT NULL,
      nome        TEXT    NOT NULL,
      emoji       TEXT    NOT NULL DEFAULT '🎯',
      valor_alvo  REAL    NOT NULL,
      valor_atual REAL    NOT NULL DEFAULT 0,
      criado_em   TEXT    DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );

    CREATE TABLE IF NOT EXISTS reservas (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      meta_id   INTEGER NOT NULL,
      valor     REAL    NOT NULL,
      criado_em TEXT    DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (meta_id) REFERENCES metas(id)
    );
  `);

  console.log('[DB] Banco inicializado ✓');
}
