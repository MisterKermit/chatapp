import "./style.scss"

import {
  Application,
} from "pixi.js";

// import { Board } from "./board";
import { Bar } from "./bar";
import { ChatWindow } from "./chat";
import { ChatMessage, Message } from "./chat";

const API_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3001";

(async () => {
  const root = document.getElementById("app");
  if (root === null) {
    throw new Error("Root not found");
  }

  const app = new Application();
  await app.init({ background: "#f8f8f8", resizeTo: window });
  app.canvas.style.position = "absolute";

  // context was never an option
  app.canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  const socket = new WebSocket(WS_URL);

  // Listen for messages
  socket.addEventListener("message", (event) => {
    let msg: Message = JSON.parse(event.data)

    const newMessage = msg as ChatMessage;

    chatWindow.acceptMessage('user', newMessage.message);
   

    console.log("Message from server ", event.data);
  });

  // Create chat window
  const eleChatWindow = document.createElement("div");
  eleChatWindow.id = "chat";
  const chatWindow = new ChatWindow(eleChatWindow, "bob", socket);
  root.appendChild(eleChatWindow);

  // Create board
//   let req = await fetch(API_URL + "/pixels");
//   const board = new Board(pixels, app, socket);

  // Create bottom bar
  const eleBottomBar = document.createElement("div");
  eleBottomBar.id = "bottom-bar";

  const sendMessageCallback = (chatEle: HTMLInputElement) => {
    const trimmed = chatEle.value.trim();
    if (trimmed.length === 0) {
      return
    }
    chatWindow.sendMessage(trimmed);
    chatEle.value = "";
  };
  new Bar(eleBottomBar, sendMessageCallback);
  root.appendChild(eleBottomBar);

  root.appendChild(app.canvas);

})()
