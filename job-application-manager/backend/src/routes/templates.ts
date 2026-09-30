import { Router } from 'express';
import { readJson } from '../services/file.service.js';

const router = Router();

router.get('/', (_req, res) => {
  const templates = readJson('templates.json');

  res.json(templates);
});

export default router;
