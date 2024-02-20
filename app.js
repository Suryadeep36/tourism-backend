const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
let port = process.env.PORT || 3000;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://gohilsuryadeep3101:"+process.env.PASSWORD+"@cluster0.wmc1wne.mongodb.net/?retryWrites=true&w=majority");
}

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    message: String
})

const Message = mongoose.model('Message',messageSchema);
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/contact",(req, res) => {
    res.send("Why are you here :-/")
})
app.post("/contact", (req, res) => {
    let {name: name, email: email, number: number, message: message} = req.body;
    const newMessage = new Message({
        name: name,
        email: email,
        number: number,
        message: message
    });
    newMessage.save()
    .then(() => {
        res.status(200).json({ message: "Saved successfully" });
      })
      .catch(error => {
        console.error("Error saving message:", error);
        res.status(500).json({message: "Failed Saving" });
      });
})
app.listen(port, () => {
    console.log("Server running at port " + port);
})
