// Node modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

// Helper functions
const db = require("./helpers/dbInterface");
const tagFinder = require("./helpers/tagFinder");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.locals.username = req.cookies.username;
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
// End of middleware

app.set("view engine", "jade");

app.get("/", (req, res) => {
    res.redirect("/clucks");
});

app.get("/sign_in", (req, res) => {
    res.render("signIn");
});

app.post("/sign_in", (req, res) => {
    res.cookie("username", req.body.username);
    res.redirect(req.cookies.previousPage ? req.cookies.previousPage : "/");
});

app.post("/sign_out", (req, res) => {
    res.clearCookie("username");
    res.redirect(req.cookies.previousPage ? req.cookies.previousPage : "/");
});

app.get("/clucks/new", (req, res) => {
    res.cookie("previousPage", "/clucks/new");
    res.render("clucks/new");
});

app.post("/clucks/new", (req, res) => {
    // {content: "", tags: []}
    let content = tagFinder(req.body.content);

    if (content.tags) {
        db.saveMultiple(
            content.tags.map(element => {
                return { tag: element };
            }),
            "tags"
        ).then(
            db
                .save({
                    username: res.locals.username ? res.locals.username : "&",
                    image_url: req.body.imageUrl,
                    content: content.content
                })
                .then(() => {
                    res.redirect("/clucks");
                })
        );
    } else {
        db.save({
            username: res.locals.username ? res.locals.username : "&",
            image_url: req.body.imageUrl,
            content: content.content
        }).then(() => {
            res.redirect("/clucks");
        });
    }
});

app.get("/clucks", (req, res) => {
    res.cookie("previousPage", "/clucks");
    db.count("tags", "tag", "tag").then(tags => {
        db.fetch().then(clucks => {
            res.render("clucks/index", {
                clucks: clucks,
                tags: tags
            });
        });
    });
});

const PORT = 5665;
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, () => {
    console.log(`Listening on port ${PORT} and ${ADDRESS}`);
});
