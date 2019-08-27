// Node modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

// Helper functions
//

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.locals.username = req.cookies.username;
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.set("view engine", "jade");

app.get("/", (req, res) => {
    res.cookie("previousPage", "/")
    res.render("home");
});

app.get("/sign_in", (req, res) => {
    res.render("signIn");
});

app.post("/sign_in", (req, res) => {
    res.cookie("username", req.body.username);
    res.redirect((req.cookies.previousPage) ? req.cookies.previousPage : "/");
});

app.post("/sign_out", (req, res) => {
    res.clearCookie("username");
    res.redirect((req.cookies.previousPage) ? req.cookies.previousPage : "/");
});

const PORT = 5665;
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, () => {
    console.log(`Listening on port ${PORT} and ${ADDRESS}`);
});
