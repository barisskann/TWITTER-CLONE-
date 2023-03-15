require("dotenv").config();
const server = require("./api/server");

server.listen(process.env.PORT || 7000, () => {
  console.log("SERVER LİSTENİNG");
});
