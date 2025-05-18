import express from "express";
import { getMidiDevices } from "./app/midi";

const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("index", {
    midiDevices: getMidiDevices(),
  });
});

server.listen(process.env.PORT, () => console.log("Server started"));
