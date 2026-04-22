const { Server } = require("socket.io");
const Chat = require("../models/Chat");
const bcrypt = require("bcrypt");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "https://eliezermucaji.github.io" }
  });

  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    // ENTRAR NUM CHAT
    socket.on("join", async ({ chat_id, password }) => {
      const chat = await Chat.getChatForLogin(chat_id);

      if (!chat) {
        return socket.emit("access_denied", {
          message: "Chat inexistente"
        });
      }

      if (!chat.is_public) {
        const ok = await bcrypt.compare(password, chat.password);

        if (!ok) {
          return socket.emit("access_denied", {
            message: "senha errada"
          });
        }
      }

      socket.join(`chat_${chat_id}`);
      socket.emit("join_success", { chat_id });
    });


    //TESTE DE ESTAR DENTRO DO CHAT
    socket.on('teste_entrar', (id)=>{
      console.log(`Alguem entrou no chat: chat_${id}`);
      socket.join(`chat_${id}`);
    })

    // MENSAGEM
    socket.on("send_message", (msg) => {
      const info = {
        msg,
        socket_id:socket.id
      }
      socket.to(`chat_${msg.chat_id}`).emit("new_message", info);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
}

function getIO() {
  if (!io) throw new Error("Socket not initialized");
  return io;
}

function createChat(chat) {
  io.emit("new_chat", chat);
}

module.exports = { initSocket, getIO, createChat };