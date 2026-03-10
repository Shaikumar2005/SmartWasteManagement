// src/config.js
const CONFIG = {
  PORT: 5000,

  // MySQL
  DB_HOST: "localhost",
  DB_USER: "root",
  DB_PASS: "root@39",            // <= put your MySQL password if any
  DB_NAME: "smart_waste",

  // CORS (your React app URL)
  CLIENT_ORIGIN: "http://localhost:3000",

  // Auth
  JWT_SECRET: "dfghjkjhgfds6789ogkfjdhsgfacvbndifg67f8d9sodjhbfvb",
  JWT_EXPIRES: "7d",

  // WebSocket path
  WS_PATH: "/ws"
};

export default CONFIG;