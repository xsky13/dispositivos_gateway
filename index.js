const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { authMiddleware } = require("./middleware/auth");
const { services } = require("./services");
const mqtt = require("mqtt");
const { Server } = require("socket.io");
const http = require("http");
const jwt = require("jsonwebtoken")
const cors = require("cors");
require('dotenv').config();


const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: 'http://localhost:5174',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
// app.use(authMiddleware);


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

services.forEach(service => {
    app.use(service.route, createProxyMiddleware(service.proxy));
})

const mqttClient = mqtt.connect("mqtt://localhost:1884");
const topic = "alerts-processed";

mqttClient.on("connect", () => {
    console.log("Conectado al broker MQTT en puerto 1884");
    mqttClient.subscribe(topic, { qos: 1 }, (err) => {
        if (err) console.error("Error al suscribirse:", err);
        else console.log(`Suscrito al tema: ${topic}`);
    });
});


mqttClient.on("message", (_, message) => {
    try {
        const alert = JSON.parse(message.toString());
        console.log(alert);
        io.sockets.sockets.forEach((socket) => {
            if (alert.usuarios && alert.usuarios.includes(parseInt(socket.user.id))) {
                socket.emit("alert", alert);
                console.log(`Alert sent to user ${socket.user.id}`);
            } else {
                console.log('usuario not in array');
            }
        });
    } catch (err) {
        console.error(err);
    }
});

mqttClient.on("error", (err) => {
    console.error("MQTT error:", err);
    mqttClient.end();
});


io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("No hay token"));
    }

    jwt.verify(token, process.env.JWT_SIGN_KEY, (err, decoded) => {
        if (err) {
            return next(new Error("No hay token"));
        }
        socket.user = decoded;
        return next();
    });
});



server.listen(8000, () => {
    console.log("Listening on 8000");
});