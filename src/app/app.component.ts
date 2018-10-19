import { Component } from "@angular/core";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  messageText: string;
  messages: Array<any> = [];
  socket: SocketIOClient.Socket;
  myID: string;
  myMp3FileName: string = "";
  userName: string = "";
  constructor() {
    this.socket = io.connect();
    console.log(this.socket.id);
  }
  ngOnInit() {
    this.messages = new Array();

    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("msg", data => {
      this.messages.push(data);
    });
    this.socket.on("getMyID", data => {
      this.myID = data;
      this.myMp3FileName = this.myID + ".mp3";
    });
  }

  sendMessage() {
    this.socket.emit("newMsg", {
      msg: this.messageText,
      userName: this.userName,
    });
    this.messageText = "";
  }
}

// this.socket.emit("event1", {
//   msg: "Client to server, can you hear me server?",
// });
// this.socket.on("event2", (data: any) => {
//   console.log(data.msg);
//   this.socket.emit("event3", {
//     msg: "Yes, its working for me!!",
//   });
// });
// this.socket.on("event4", (data: any) => {
//   console.log(data.msg);
// });
