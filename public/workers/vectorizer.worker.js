// Vectorizer Worker for JPEG to SVG
// Uses ImageTracer logic for high-performance tracing

importScripts('https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.js');

self.onmessage = function(e) {
  const { imageData, options } = e.data;
  
  try {
    // ImageTracer is a global in the script
    const svgString = ImageTracer.imagedataToSVG(imageData, options);
    self.postMessage({ success: true, svg: svgString });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
