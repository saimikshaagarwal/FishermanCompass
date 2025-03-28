const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const {ask}=require("./gemini.service");
const app=express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat",async(req,res)=>{
    console.log("Incoming request is",req);
    console.log("Incoming request body is",req.body);
    console.log("Response is:",res);

    const chatId=req.body.chat_id;
    const message=req.body.message;

    if(!chatId) return res.status(400).json({error:"ChatId is missing"});
    if(!message) return res.status(400).json({error:"Message is missing"});

    console.log("Received message:$(message)");
    const response=await ask(chatId,message);
    console.log("Response from ask function:",response);
    if(!response || !response.reply){
        console.log("ask function returned an empty response");
        return res.status(500).json({error:"No response from chatbot"});
    }
    return res.json(response);
});

app.listen(8080,()=>{
    console.log("Server running on port 8080");
});