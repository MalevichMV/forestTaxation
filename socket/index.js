const { nanoid } = require('nanoid');

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
    });
    
      
    socket.on("sendMessage", ({ senderId, receiverId, conversationId, text, sendingDate }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            id: nanoid(),
            userId: senderId,
            conversationId,
            sendingDate,  
            text
          });
    });
    
      
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
    });
})