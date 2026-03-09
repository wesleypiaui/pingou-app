// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { inicializarBanco } from './database/db';
import usuariosRoutes from './routes/usuarios';
import metasRoutes from './routes/metas';
import reservasRoutes from './routes/reservas';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/metas', metasRoutes);
app.use('/reservas', reservasRoutes);

app.get('/', (_req, res) => {
  res.json({
    api: 'Pingou API',
    versao: '1.0.0',
    status: 'online',
    endpoints: [
      'POST   /usuarios',
      'GET    /usuarios/:id',
      'POST   /metas',
      'GET    /metas/:id',
      'GET    /metas/usuario/:usuario_id',
      'POST   /reservas',
      'GET    /reservas/:meta_id',
    ],
  });
});

app.use(errorHandler);

// Inicializa banco antes de abrir o servidor
inicializarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`[PINGOU API] Rodando em http://localhost:${PORT}`);
  });
});

export default app;
