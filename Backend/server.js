const express = require("express");
const app = express();
/*eslint no-console: 0*/
("use strict");

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });
app.use("/", express.static(__dirname + "/../LoginScreen/webapp"));
// app.use(express.static("../LoginScreen"));
// TODO: POST的返回值的设定方法
app.post("/login", function(req, res) {
  res.send("POST is sended.");
});
app.listen(3000, () => console.log("Example app listening on port 3000!"));
// var http = require("http");
// var port = process.env.PORT || 3000;

// http.createServer(function (req, res) {
//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.end("Hello World\n");
// }).listen(port);

// console.log("Server listening on port %d", port);
