require("dotenv").config(); // 별도의 config 파일을 두면 좋을 듯.

// src/config/index.js
if (process.env.MONGODB === undefined) {
    throw new Error("Env variable MONGODB is missing!!");
}
// Fail fast strategy


module.exports = {
    mongodbUri: process.env.MONGODB,
    port: process.env.PORT,
}