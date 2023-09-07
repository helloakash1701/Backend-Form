import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser"; // Added body-parser

const app = express();
app.use(express.static(path.join(path.resolve(), "public")));

// Add middleware to handle request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend",
}).then(() => console.log("Database connected")).catch((e) => console.log(e))

// NOTE - Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Message = mongoose.model("Message", messageSchema)

app.get("/add", async (req, res) => {
    
    await Message.create({ name: "Akash", email: "akash@gmail.com" });
    res.send("Nice");
})

// NOTE - setting up view engine
app.set("view engine", "ejs");

// NOTE - routing on server
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/success", (req, res) => {
    res.render("success");
})

app.post("/contact", async(req, res) => {
    const {name,email} = req.body;
    await Message.create({name: name, email: email})
    res.redirect("/success");
});

app.listen(5000, () => {
    console.log("SERVER IS ON");
})
