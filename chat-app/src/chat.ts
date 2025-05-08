export interface ChatMessage {
    message: string; 
}

export interface Message {
    message: string;
}

export class ChatWindow {
    root: HTMLDivElement;
    username: string;
    socket: WebSocket;

    constructor(root: HTMLDivElement, username: string, socket: WebSocket) {
        this.root = root;
        this.username = username; 
        this.socket = socket;
        this.init();
    }

    public acceptMessage(username: string, msg: string) {
        const p = document.createElement("p");
        p.innerHTML = `<b>${username}></b> ${msg}`;
    }

    public sendMessage(msg: string) {
        this.acceptMessage(this.username, msg);
        const message: ChatMessage = {
          message: msg
        };
        this.socket.send(JSON.stringify(message));
      }

      private init() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
          if (event.key === "Control") {
            this.root.style.pointerEvents = "auto";
          }
        });
        document.addEventListener("keyup", (event: KeyboardEvent) => {
          if (event.key === "Control") {
            this.root.style.pointerEvents = "none";
          }
    
        })
      }
}