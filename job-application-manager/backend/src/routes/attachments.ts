import { Router } from 'express';
import {
  readJson,
  writeJson,
} from '../services/file.service.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(
      readJson('attachments.json')
  );
});

router.patch('/', (req, res) => {

  const attachments = req.body;

  writeJson(
      'attachments.json',
      attachments
  );

  res.json({
    success: true,
  });
});

export default router;