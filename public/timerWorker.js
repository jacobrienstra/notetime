/* eslint-disable no-restricted-globals */
let interval;
onmessage = () => {
      const d0 = new Date().valueOf();
      interval = setInterval(() => {
        // eslint-disable-next-line no-restricted-globals
        self.postMessage(new Date().valueOf() - d0);
      }, 100);
};