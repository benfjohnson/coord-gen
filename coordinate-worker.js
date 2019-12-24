const  getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
};

const generateRandomUSCoordinates = () => {
  const long = getRandomIntInclusive(80, 120);
  const lat = getRandomIntInclusive(30, 45);

  return { lat, long };
};

onmessage = function(e) {
  console.log('Message received from main thread...');

  const [ signal, speed, duration ] = e.data;

  // Generate events at the cadence specified by the second web worker parameter
  const coordGenerator = setInterval(() => postMessage(generateRandomUSCoordinates()), 1000 / speed);
  // After the specified duration, in minutes, stop generating lat/long events:
  setTimeout(() => clearInterval(coordGenerator), duration * 1000 * 60);
};
