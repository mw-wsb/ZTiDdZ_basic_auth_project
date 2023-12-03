// Requiring module
const express = require("express");
var path = require("path");

// Initialize express application
const app = express();

function authentication(req, res, next) {
    // Get authorization header
    var authheader = req.headers.authorization;
    console.log(req.headers);

    // Check if authorization header is not empty
    if (!authheader) {
        // Create error
        var err = new Error("You are not authenticated!");
        // Set header - ask for credentials
        res.setHeader("WWW-Authenticate", "Basic");
        // 401 - Unauthorized
        err.status = 401;
        return next(err);
    }

    // Extract username and password from authorization header
    var auth = new Buffer.from(authheader.split(" ")[1], "base64")
        .toString()
        .split(":");
    var user = auth[0];
    var pass = auth[1];

    if (user == "" && pass == "") {
        // If Authorized user
        next();
    } else {
        // Create error
        var err = new Error("You are not authenticated!");
        // Set header - ask for credentials
        res.setHeader("WWW-Authenticate", "Basic");
        // 401 - Unauthorized
        err.status = 401;
        return next(err);
    }
}

// First step is the authentication of the client
app.use(authentication);
app.use(express.static(path.join(__dirname, "public")));

// Server setup
app.listen(3000, () => {
    console.log("Server is Running");
});
