import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.resolve(
    process.cwd(),
    '..',
    'frontend',
    'public',
    'data'
);

export function readJson<T>(
    filename: string
): T {
  const filePath = path.join(
      DATA_DIR,
      filename
  );

  const content = fs.readFileSync(
      filePath,
      'utf8'
  );

  return JSON.parse(content);
}

export function writeJson(
    filename: string,
    data: unknown
) {
  const filePath = path.join(
      DATA_DIR,
      filename
  );

  fs.writeFileSync(
      filePath,
      JSON.stringify(data, null, 2)
  );
}