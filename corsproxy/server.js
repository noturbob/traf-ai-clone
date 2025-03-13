const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

app.get("/proxy", (req, res) => {
    const streamUrl = req.query.url; // The IP camera's MJPEG URL
    if (!streamUrl) return res.status(400).json({ error: "Missing stream URL" });

    console.log(`Proxying video stream from: ${streamUrl}`);

    res.setHeader("Content-Type", "multipart/x-mixed-replace; boundary=frame");
    
    request.get(streamUrl).pipe(res); // Pipe MJPEG frames to the frontend
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MJPEG Proxy running on port ${PORT}`));
