
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());


let chats = [];


app.get('/chats', (req, res) => {
  res.json(chats);
});

app.get('/chats/:id', (req, res) => {
  const chat = chats.find(t => t.id === parseInt(req.params.id));
  if (!chat) {
    res.status(404).send();
  } else {
    res.json(chat);
  }
});

app.post('/chats', (req, res) => {
  const newchat = {
    id: Math.floor(Math.random() * 1000000), 
    title: req.body.title,
    description: req.body.description
  };
  chats.push(newchat);
  res.status(201).json(newchat);
});

app.delete('/chats/:id', (req, res) => {
  const chatIndex = chats.findIndex(t => t.id === parseInt(req.params.id));
  if (chatIndex === -1) {
    res.status(404).send();
  } else {
    chats.splice(chatIndex, 1);
    res.status(200).send();
  }
});

app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;

app.listen(3000)