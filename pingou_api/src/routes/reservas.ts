// src/routes/reservas.ts
import { Router } from 'express';
import { criarReserva, listarReservas } from '../controllers/reservasController';

const router = Router();

router.post('/', criarReserva);
router.get('/:meta_id', listarReservas);

export default router;
