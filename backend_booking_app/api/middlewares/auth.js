import {User} from '../models';
import validator from 'validator';
export default async (req, res, next)=>{
    const {name, email, username, password}=req.body;
    if(!validator.isEmail(email)){
        return res.status(400).send({error:"improper email address"})
    }
    let msg =""
    if(!name || !email || !username || !password){
        if(!email){ msg = "email is required" }
        else if(!name){ msg = "name is required" }
        else if(!password){ msg = "password is required" }
        else if(!username){ msg = "username is required" }
        return res.status(400).send({error:msg});
    }
    const user = await User.findOne({where: { username }})
    if(user){
        return res.status(409).send({error:"user already exists"})
    }
    next();
}