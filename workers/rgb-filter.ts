self.onmessage = function (ev) {
  const data = ev.data as MessageData;
  if (data && data.type && data.message) {
    handleMessageData(data);
  }
};

function handleMessageData(data: MessageData) {
  const rgb = data.message;
  let [r, g, b] = rgb;
  r = r || '0';
  g = g || '0';
  b = b || '0';
  const rgbString = `rgb(${r}, ${g}, ${b})`;
  self.postMessage({ type: 'rgb', message: rgbString });
}

export interface MessageData {
  type: string;
  message: string[];
}
