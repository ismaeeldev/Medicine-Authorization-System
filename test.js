const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ismaeeldev:ismaeeldev@medico.fohseon.mongodb.net/")
    .then(() => {
        console.log("Connected successfully");
        process.exit();
    })
    .catch((err) => {
        console.error("Connection failed:", err);
        process.exit();
    });