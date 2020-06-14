var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var cors = require("cors");

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://learning-angular-js.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://learning-angular-js.com/api",
  issuer: "https://learning-angular-js.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.use(cors());

app.get("/authorized", function (req, res) {
  res.json({
    message:
      "This is a secured end point and this message is coming from the server runnning on local host: 8080",
  });
});

app.listen(port);
console.log("Server is running at the localhost:8080");
