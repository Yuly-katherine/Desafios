import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import { Server } from "socket.io";

const app = express();

app.use("/", viewsRouter);
app.use("/api/products", productsRouter)


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/../public"));



const httpServer = app.listen(8080, () =>{
    console.log("listening on port 8080");
});
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket)=>{
    console.log("New client connected.")
})


app.use((req,res,next)=>{
    req.socketServer = socketServer
    next()
})

