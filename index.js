const express = require ("express");
const session = require ("express-session");
const MongoStore = require ("connect-mongo");

const app = express()


app.use(express.static( __dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
app.use(
  session({
    store: MongoStore.create({
    mongoUrl: "mongodb+srv://Lautaro:LoL211255@clusterlol1.kugiw.mongodb.net/ClusterLOL1?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),
  secret: "desafio10",
  resave:false,
  saveUninitialized:false,
  rolling:true, 
  cookie: {maxAge: 3000},

}))


const login = require("./routes/login");
app.use("/api/login", login)
const logout = require("./routes/logout");
app.use("/api/logout", logout);
const chatRoute = require ("./routes/chat");
app.use("/api/chat", chatRoute);
const prodRoute = require ("./routes/productos");
app.use("/api/products", prodRoute)

const http = require("http");
const server = http.createServer(app)

const { Server } = require ("socket.io");
const io = new Server(server)

io.on("connection", (socket)=> {
    socket.emit("render", "")
    socket.on("actualizacion", ()=>{
      io.sockets.emit("render", "")
    })
  })

server.listen(8081, () => {
    console.log("Servidor 👍 por 8081")
})