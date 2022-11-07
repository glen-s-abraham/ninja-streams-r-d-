const express = require('express')
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname,'/public')));

https.createServer({
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.cert')
  }, app).listen(port, () => {
    console.log(`Admin client listeing on ${port}`);
  });