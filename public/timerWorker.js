/* eslint-disable no-restricted-globals */
let interval;
onmessage = () => {
      interval = setInterval(() => {
        // eslint-disable-next-line no-restricted-globals
        self.postMessage("tick");
      }, 10);
};