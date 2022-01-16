const express = require ("express");
const session = require ("express-session");
const chatRoute = require ("./routes/chat");
const MongoStore = require ("connect-mongo");
const prodRoute = require ("./routes/productos");
const login = require("./routes/login")
const logout = require("./routes/logout")
const advancedOptions = { useNewUrlParcer: true, useUnifiedTopology: true}

const app = express()


app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

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


app.use("/api/login", login)
app.use("/api/logout", logout)
app.use("/api/chat", chatRoute);
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