// src/routes/metas.ts
import { Router } from 'express';
import { criarMeta, buscarMeta, listarMetasDoUsuario } from '../controllers/metasController';

const router = Router();

router.post('/', criarMeta);
router.get('/usuario/:usuario_id', listarMetasDoUsuario);
router.get('/:id', buscarMeta);

export default router;
