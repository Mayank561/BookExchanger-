const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const Message = require("./models/Messge");
const { sendChatMail } = require("./controller/users");
const User = require("./models/User");

dotenv.config({ path: "./config/config.env" });
const app = express();
const PORT = process.env.PORT || 8000;

app.use(compression());
app.use(express.json({ limit: "80mb", extended: true }));
app.use(express.urlencoded({ limit: "80mb", extended: true }));

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// CORS setup
const corsOptions = {
  origin:
    "https://book-exchanger-git-main-mayanks-projects-a6ea03be.vercel.app",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  allowedHeaders: [
    "authorization",
    "Content-Type",
    "origin",
    "x-requested-with",
  ],
  credentials: true,
  maxAge: 86400,
};

app.use(cors(corsOptions));

connectDB();

app.get("/", (req, res) => {
  res.send("This is Bookxchanger");
});

app.use("/books/", require("./routes/books"));
app.use("/users/", require("./routes/users"));

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

const io = require("socket.io")(server, {
  cors: {
    origin:
      "https://book-exchanger-git-main-mayanks-projects-a6ea03be.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on("landing_page", (data) => {
    console.log("Landing page event:", data);
  });

  socket.on("login", (data) => {
    if (!socket.rooms.has(data.id)) {
      socket.join(data.id);
    }
  });

  socket.on("logout", (data) => {
    socket.leave(data.id);
  });

  socket.on("join", async (data) => {
    const messages = await Message.find({
      $or: [
        { from: data.id, to: data.receiver },
        { from: data.receiver, to: data.id },
      ],
    });
    socket.emit("initial_msgs", messages);
  });

  socket.on("message", async (msg) => {
    try {
      const message = new Message({
        from: msg.from,
        to: msg.to,
        content: msg.content,
        fromName: msg.fromName,
        sentAt: Date.now(),
      });
      await message.save();

      const rooms = socket.adapter.rooms;
      if (rooms.has(msg.to)) {
        io.to(msg.to).emit("send_msg", {
          content: message.content,
          from: message.from,
          to: message.to,
          fromName: msg.fromName,
          sentAt: message.sentAt,
        });
        io.to(msg.from).emit("send_msg", {
          content: message.content,
          from: message.from,
          to: message.to,
          fromName: msg.fromName,
          sentAt: message.sentAt,
        });
      } else {
        io.to(msg.from).emit("send_msg", {
          content: message.content,
          from: message.from,
          to: message.to,
          fromName: msg.fromName,
          sentAt: message.sentAt,
        });
        const receiver = await User.findById(message.to);
        await sendChatMail(
          receiver.email,
          receiver.name,
          message.fromName,
          `http://https://book-exchanger-git-main-mayanks-projects-a6ea03be.vercel.app/user/${message.from}`
        );
      }
    } catch (err) {
      console.error("Error handling message:", err);
    }
  });
});
