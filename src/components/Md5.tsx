import React, { ChangeEventHandler } from 'react';
import md5 from 'md5';

const readFile: (file: File) => Promise<ArrayBuffer> = (file) => {
  return new Promise((resolve, reject) => {
    const rd = new FileReader();
    rd.onload = () => {
      const buffer = rd.result as ArrayBuffer;
      if (buffer) {
        resolve(buffer);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    rd.onerror = reject;
    rd.readAsArrayBuffer(file);
  });
};

function Md5() {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      readFile(files[0]).then((buffer) => {
        const u8 = new Uint8Array(buffer);
        const code = md5(u8);
        console.log('md5', code);
      });
    }
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
}

export default Md5;
