const server = require("./app");
const port = process.env.PORT;

server.listen(port, () => console.log(`App running on Port: ${port}`));
