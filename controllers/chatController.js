const Chat = require('../models/Chat')
const bcrypt = require('bcrypt')
import { z } from "zod";

const createChatSchema = z.object({
    name: z.string(),
    is_public: z.boolean(),
    password: z.string().optional(),
    expired_at: z.number().int().min(1).max(24)
});

const createChat = async (req, res) => {
    try {

        const data = createChatSchema.parse(req.body);

        const chat = await Chat.create(data);

        res.status(201).json({
            chat,
            message:'Chat criado com sucesso'
        })
    } catch (error) {
        
    }
}

const getChats = async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}

const getChat = async (req, res)=> {
    try{
        const id = req.params.id;
        const id_number = Number(id);
        if(!Number.isInteger(id_number)) {
            return res.status(400).json({
                message:'Id inválido'
            });
        }

        const chat = await Chat.getById(id_number);
        if(!chat) {
            return res.status(404).json({
                message:'Chat not found'
            })

        }

        return res.json({
            ok:true,
            chat
        })
    }catch(error) {
        console.log('Internal server error')
    }
}