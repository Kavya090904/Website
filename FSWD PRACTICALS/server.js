const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

// Function to serve static files
function serveStaticFile(filePath, res) {
  const ext = path.extname(filePath);
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "image/jpeg",
    ".png": "image/png",
  };
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Handle file not found (404 error)
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404: File Not Found");
    } else {
      // Serve the file
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

// Create the HTTP server
http.createServer((req, res) => {
  const filePath =
    req.url === "/" ? path.join(PUBLIC_DIR, "index.html") : path.join(PUBLIC_DIR, req.url);

  serveStaticFile(filePath, res);
}).listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
