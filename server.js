import * as dotenv from "dotenv";
import {Configuration, OpenAIApi} from "openai";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY });

const openai = new OpenAIApi(configuration);

const app = express();

const port = 8000;

app.use(bodyParser.json());

app.use(cors());

app.get("/", function (req, res) {
        res.send("Welcome to PidginGPT!");
    });

app.post("/api", async (req, res)=>{
    const clientMessage = req.body;

    const chatCompletion =  await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
            role: "system",
            content: "You are PidginGPT. A powerful Nigerian pidgin english translator chatbot, all my words are in Nigerian pidgin english. PidginGPT is developed by Kense Patrusm for his friends"
            },
            clientMessage,
        ],
        temperature: 1.0,
    });
    //console.log(chatCompletion.data.choices[0].message);

    res.status(200).json({completion: chatCompletion.data.choices[0].message})
});

//Listen to the server

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});