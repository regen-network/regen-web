/* eslint-disable lingui/no-unlocalized-strings, no-console */
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.join(import.meta.dir, '..');

// Client CSS files must be added here.
// The `key` must match the `NEXT_PUBLIC_MARKETPLACE_CLIENT` environment variable
const CLIENT_CSS_PATHS = {
  regen: path.join(projectRoot, '..', 'tailwind.css'),
  terrasos: path.join(
    projectRoot,
    'src/clients/terrasos/Terrasos.tailwind.css',
  ),
};

const client = process.env.NEXT_PUBLIC_MARKETPLACE_CLIENT || 'regen';
const sourcePath = CLIENT_CSS_PATHS[client];

if (!sourcePath) {
  console.error(`Error: Invalid NEXT_PUBLIC_MARKETPLACE_CLIENT "${client}".`);
  process.exit(1);
}

const targetPath = path.join(projectRoot, 'src/generated/client-tailwind.css');

try {
  const destDir = path.dirname(targetPath);
  await mkdir(destDir, { recursive: true });
  await copyFile(sourcePath, targetPath);
  console.log(`✅ Set client styles for "${client}".`);
} catch (error) {
  console.error('Error setting client CSS:', error);
  process.exit(1);
}
