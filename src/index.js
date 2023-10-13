const express = require("express");
const routes = require("./routes");
require ("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/static"));
app.use("/", routes.root);

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`[+] Listening on ${process.env.HOSTNAME}:${process.env.PORT}...`);
});