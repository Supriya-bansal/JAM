import { Router } from 'express';
import {
  readJson,
  writeJson,
} from '../services/file.service.js';

const router = Router();

router.get('/', (_req, res) => {
  const applications =
      readJson<any[]>('applications.json');

  res.json(applications);
});

router.patch('/:id/status', (req, res) => {
  const id = Number(req.params.id);

  const { status } = req.body;

  const applications =
      readJson<any[]>('applications.json');

  const updated = applications.map(app => {

    if (app.id === id) {

      return {
        ...app,
        status,
        applied: status === 'Applied',
        appliedDate:
            status === 'Applied'
                ? new Date().toISOString()
                : app.appliedDate,
      };
    }

    return app;
  });

  writeJson(
      'applications.json',
      updated
  );

  res.json({
    success: true,
  });
});

export default router;