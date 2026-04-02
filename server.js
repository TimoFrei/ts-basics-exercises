// ============================================================
//  server.js  –  Node.js backend using only built-in modules
//  Endpoints:
//    GET    /songs          – return all songs
//    POST   /songs          – add a new song
//    PUT    /songs/:id      – update a song by id
//    DELETE /songs/:id      – delete a song by id
// ============================================================

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data", "songs.json");

// ------ helpers ------

function readSongs() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeSongs(songs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(songs, null, 2));
}

function serveStatic(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

function json(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// ------ server ------

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  // Allow requests from the browser without CORS issues
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // ---- Static files ----
  if ((url === "/" || url === "/index.html") && method === "GET") {
    return serveStatic(
      res,
      path.join(__dirname, "public", "index.html"),
      "text/html",
    );
  }

  if (url === "/app.js" && method === "GET") {
    return serveStatic(
      res,
      path.join(__dirname, "public", "app.js"),
      "application/javascript",
    );
  }

  if (url === "/styles.css" && method === "GET") {
    return serveStatic(
      res,
      path.join(__dirname, "public", "styles.css"),
      "text/css",
    );
  }

  // ---- GET /songs ----
  if (url === "/songs" && method === "GET") {
    return json(res, 200, readSongs());
  }

  // ---- POST /songs ----
  if (url === "/songs" && method === "POST") {
    const body = await readBody(req);
    const newSong = JSON.parse(body);
    newSong.id = Date.now(); // simple unique id

    const songs = readSongs();
    songs.push(newSong);
    writeSongs(songs);

    return json(res, 201, newSong);
  }

  // ---- PUT  /songs/:id  and  DELETE /songs/:id ----
  const songRoute = url.match(/^\/songs\/(\d+)$/);

  if (songRoute && method === "PUT") {
    const id = Number(songRoute[1]);
    const body = await readBody(req);
    const songs = readSongs();
    const index = songs.findIndex((s) => s.id === id);

    if (index === -1) {
      res.writeHead(404);
      res.end("Song not found");
      return;
    }

    songs[index] = { ...songs[index], ...JSON.parse(body) };
    writeSongs(songs);
    return json(res, 200, songs[index]);
  }

  if (songRoute && method === "DELETE") {
    const id = Number(songRoute[1]);
    const songs = readSongs();
    const updated = songs.filter((s) => s.id !== id);
    writeSongs(updated);
    return json(res, 200, { message: "Deleted" });
  }

  // ---- 404 fallback ----
  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop.");
});
