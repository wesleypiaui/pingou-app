// src/routes/usuarios.ts
import { Router } from 'express';
import { criarUsuario, buscarUsuario } from '../controllers/usuariosController';

const router = Router();

router.post('/', criarUsuario);
router.get('/:id', buscarUsuario);

export default router;
