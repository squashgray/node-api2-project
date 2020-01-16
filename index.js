require('dotenv').config();
const server = require("./api/server"); // imports server from api
const port = process.env.PORT

server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:6000 ***\n"); // sets port to 5000
});
