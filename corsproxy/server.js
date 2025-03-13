const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/proxy",async(req,res) => {
    try{
        const targetUrl = req.query.url;
        if(!targetUrl) return res.status(400),json({error:"Missing Url"});

        const response = await axios.get(targetUrl,{
            headers:{"User-Agent":"Mozilla/5.0"},
        });
        res.send(response.data);
    }catch(error){
        res.status(500).json({error:"Request Failed from Server",details: error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Proxy Server Running on port ${PORT}`));