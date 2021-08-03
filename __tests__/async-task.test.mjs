import fs from 'fs';
import fsp from 'fs/promises';

const TEST_URL = '../';

async function ioAsync() {
  return new Promise((resolve, reject) => {
    fs.readdir(TEST_URL, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

async function ioPromise() {
  const files = await fsp.readdir(TEST_URL).catch(err => {
    console.error('ioPromise', err);
  });
  if (files) {
    return files;
  }
}

function ioSync() {
  try {
    return fs.readdirSync(TEST_URL);
  } catch (error) {
    console.log('ioSync', error);
  }
}

function main() {
  const files = ioSync();
  if (files) {
    console.log('ioSync', files);
  }
  ioAsync().then(res => {
    console.log('ioAsync', res);
  }).catch(err => {
    console.error('ioAsync', err);
  });
  ioPromise().then(res => {
    console.log('ioPromise', res);
  });
}

main();
