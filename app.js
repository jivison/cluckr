// Node modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Helper functions
//

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Up and running!")
});

const PORT = 5665;
const ADDRESS = "localhost";

app.listen(PORT, ADDRESS, () => {
    console.log(`Listening on port ${PORT} and ${ADDRESS}`);
});
