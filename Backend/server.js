const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const logger = require("morgan");
/*eslint no-console: 0*/
("use strict");

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });

// sessionn check
var sessionCheck = function(req, res) {
  if (req.session.user) {
    res.send("sucess");
  } else {
    // res.redirect(401, "http://localhost:3000/");
    res.status(401).send("login error");
  }
};
app.use(logger("dev"));
app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/../LoginScreen/webapp"));
// app.use(express.static("../LoginScreen"));
// TODO: POST的返回值的设定方法
// sessionn init

app.use(
  session({
    name: "login",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000
    }
  })
);
app.get("/menudata", sessionCheck);
app.post("/login", function(req, res) {
  // res.send("POST is sended.");
  if (req.body.userId === "123" && req.body.password === "123") {
    req.session.user = { name: req.body.userId };
    // res.redirect('/menu');
    res.send("sucess");
  } else {
    var err = "入力が正しくありません。確認して再入力してください。";
    res.status(401).send("login error");
  }
});
app.listen(3000, () => console.log("Example app listening on port 3000!"));
// var http = require("http");
// var port = process.env.PORT || 3000;

// http.createServer(function (req, res) {
//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.end("Hello World\n");
// }).listen(port);

// console.log("Server listening on port %d", port);
