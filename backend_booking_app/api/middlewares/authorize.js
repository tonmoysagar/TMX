import jwt, { decode } from "jsonwebtoken";
import {config} from 'dotenv';
import {User} from '../models';

config();

export default (req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(401).send({error:'Unathorized'});
    };

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, {expiresIn:'24h'}, async (error,decoded)=>{
        if(error){
            return res.status(401).send({error});
        }
        const {id, username} = decoded
        const user = await User.findOne({where:{username,id}});
        if(!user){
            return res.status(401).send({error:"User does not exists"});
        }
        req.decoded = decoded
        next()
    })
}