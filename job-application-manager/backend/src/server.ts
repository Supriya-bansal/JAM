import express from 'express';
import cors from 'cors';
import path from 'node:path';

import applicationsRoutes from './routes/applications.js';
import templatesRoutes from './routes/templates.js';
import attachmentsRoutes from './routes/attachments.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  '/documents',
  express.static(
    path.resolve(process.cwd(), '..', 'frontend', 'public', 'documents'),
  ),
);

app.use('/api/applications', applicationsRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/attachments', attachmentsRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
  });
});

const frontendPath = path.resolve(
    process.cwd(),
    '..',
    'frontend',
    'dist',
    'frontend',
    'browser'
);

app.use(express.static(frontendPath));

app.get(/.*/, (_req, res) => {
  res.sendFile(
      path.join(frontendPath, 'index.html')
  );
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
