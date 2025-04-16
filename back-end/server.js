// 📁 server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const wav = require('wav');
const http = require('http');
const WebSocket = require('ws');
const Routes = require('./router/index');

dotenv.config();
const app = express();
const server = http.createServer(app); // use native HTTP server for WebSocket support
const wss = new WebSocket.Server({ server, path: "/audio" }); // bind WS to same server

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// 🌐 Middleware
app.use(cors());
app.use(express.json());
app.use(Routes);

// 🔗 MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(`❌ DB Connection Error: ${err}`));

// 🎙️ WebSocket Audio Handling
wss.on('connection', function connection(ws) {
  console.log('🎧 ESP32 connected via WebSocket');

  const fileName = `audio_${Date.now()}.wav`;
  const fileStream = fs.createWriteStream(fileName);
  const wavWriter = new wav.Writer({
    channels: 1,
    sampleRate: 8000, // Make sure this matches your ESP32 config
    bitDepth: 16,
  });

  wavWriter.pipe(fileStream);

  ws.on('message', function incoming(data) {
    wavWriter.write(data);
  });

  ws.on('close', () => {
    wavWriter.end();
    console.log(`📁 Audio saved as ${fileName}`);
    // 🧠 You can call Google STT here for live processing
  });
});

// 🚀 Start HTTP + WebSocket Server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🔊 WebSocket listening at ws://localhost:${PORT}`);
});
