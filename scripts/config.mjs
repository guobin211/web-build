import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

function getPackage() {
  const text = fs.readFileSync(path.join(ROOT, 'package.json')).toString();
  try {
    return JSON.parse(text)
  } catch (e) {
    console.error('parse package.json error');
    process.exit(1);
  }
}

const CURRENT = fileURLToPath(import.meta.url);

export const ROOT = path.resolve(CURRENT, '../../');

export const APP_PATH = path.join(ROOT, 'app');

export const SCRIPT_PATH = path.join(ROOT, 'scripts');

export const DOC_PATH = path.join(ROOT, 'docs');

export const WEBSITE_PATH = path.join(ROOT, 'website');

const pkg = getPackage();

export const PROJECT_NAME = pkg.name;

export const VERSION = pkg.version;
