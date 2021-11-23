import { decompressFrames, ParsedFrame, ParsedGif, parseGIF } from 'gifuct-js';

const pixelPercent = 100;

export class GifQueue {
  frameImageData: ImageData | undefined;
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  gif: ParsedGif | undefined;
  tempCanvas: HTMLCanvasElement;
  loadedFrames: ParsedFrame[];
  animation: number;
  tempCtx: CanvasRenderingContext2D;
  gifCanvas: HTMLCanvasElement;
  frameIndex: number;
  gifCtx: CanvasRenderingContext2D;
  hasLoop: boolean;

  constructor(dom: HTMLCanvasElement) {
    this.c = dom;
    this.ctx = dom.getContext('2d') as CanvasRenderingContext2D;
    this.tempCanvas = document.createElement('canvas');
    this.tempCtx = this.tempCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.gifCanvas = document.createElement('canvas');
    this.gifCtx = this.gifCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.frameIndex = 0;
    this.hasLoop = false;
    this.animation = 0;
    this.loadedFrames = [];
  }

  public loadBuffer(buffer: ArrayBuffer): void {
    this.gif = parseGIF(buffer);
    this.loadedFrames = decompressFrames(this.gif, true);
    this.frameIndex = 0;
    const { width, height } = this.loadedFrames[0].dims;
    this.c.width = width;
    this.c.height = height;
    this.gifCanvas.width = width;
    this.gifCanvas.height = height;
    if (!this.hasLoop) {
      this.render();
    }
  }

  public render(): void {
    if (!this.hasLoop) {
      this.hasLoop = true;
    }
    const frame = this.loadedFrames[this.frameIndex];
    if (frame.disposalType === 2) {
      this.gifCtx.clearRect(0, 0, this.c.width, this.c.height);
    }
    this.drawPatch(frame);
    this.manipulate();
    this.frameIndex++;
    if (this.frameIndex >= this.loadedFrames.length) {
      this.frameIndex = 0;
    }
    window.clearTimeout(this.animation);
    this.animation = window.setTimeout(() => {
      this.render();
    }, frame.delay);
  }

  public stop(): void {
    cancelAnimationFrame(this.animation);
  }

  private drawPatch(frame: ParsedFrame) {
    const { dims } = frame;
    const { frameImageData, tempCanvas, tempCtx } = this;

    if (
      !frameImageData ||
      dims.width != frameImageData.width ||
      dims.height != frameImageData.height
    ) {
      tempCanvas.width = dims.width;
      tempCanvas.height = dims.height;
      this.frameImageData = tempCtx.createImageData(dims.width, dims.height);
    }
    if (this.frameImageData) {
      this.frameImageData.data.set(frame.patch);
      this.tempCtx.putImageData(this.frameImageData, 0, 0);
      this.gifCtx.drawImage(tempCanvas, dims.left, dims.top);
    }
  }

  private manipulate() {
    const { gifCtx, gifCanvas, c, ctx } = this;
    const imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
    const pixelsX = 5 + Math.floor((pixelPercent / 100) * (c.width - 5));
    const pixelsY = (pixelsX * c.height) / c.width;
    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(c, 0, 0, c.width, c.height, 0, 0, pixelsX, pixelsY);
    ctx.drawImage(c, 0, 0, pixelsX, pixelsY, 0, 0, c.width, c.height);
  }
}
