export default function (error, event) {
  console.error("NITRO CAUGHT ERROR:", error);
  const errString = error && error.stack ? error.stack : String(error);
  event.node.res.statusCode = 500;
  event.node.res.setHeader('Content-Type', 'text/html');
  event.node.res.end(`<!DOCTYPE html><html><body><h1>Server Error</h1><pre>${errString}</pre></body></html>`);
}
