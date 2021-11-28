import React, { useEffect } from 'react';
import { GifQueue } from './gif-queue';
import Md5 from '../../components/Md5';

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const gifQueue = new GifQueue(canvas);
    fetch('/static/images/king.gif')
      .then((res) => res.arrayBuffer())
      .then((buff) => {
        gifQueue.loadBuffer(buff);
      });
  }, []);
  return (
    <div>
      <Md5 />
      <canvas id="canvas" width="240" height="240" />
      <img id="img" src="/static/images/king.gif" alt="" />
    </div>
  );
}

export default App;
