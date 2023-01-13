import models from '../models'
import { comparePassword, hashPassword, jwtToken } from '../utils';
import sendEmail from '../utils/sendEmail';
import validator from 'validator';


const {User} = models
const auth ={
    async signUp(req, res, next){
        try 
        {
            const {name, email,phone, password, username} = req.body;
            const hash = hashPassword(password);
            const user = await User.create({name, email,phone,username,password: hash});
            const token = jwtToken.createToken(user);
            return res.status(201).send({ token, user})
        }
        catch(e){
            return next(new Error(e))
        }
    },
    async signIn(req, res, next){
        try{
            const {username, password} = req.body;
            const user = await  User.findOne({where:{username}})
            if(user && comparePassword(password, user.password)){
                const token = jwtToken.createToken(user)
                return res.status(200).send({token, user})
            }
            return res.status(400).send({error:"invalid username/password combination"})
        }catch(e){
            return next(new Error(e))
        }
    },
    async sendResetLink(req, res, next){
        try{
            const {username} = req.body;
            const user = await User.findOne({where:{username}})
            if(!user){
                return res.status(400).send({error: 'User not found'});
            }
            if (!validator.isEmail(user.email)){
                return res.status(400).send({error: 'Invalid email'});
            }
            const token = jwtToken.createToken(user)
            const link = `${req.protocol}://${req.host}/reset_password/${token}/`
            await sendEmail(
                user.email,'tonmoysagar@gmail.com','Reset Password',
                `<div> Click on the link to reset password</div><br>
                <div>${link}</div>
                `
            );
            return res.status(200).send({message:'Reset link sent'})
        }catch(e){
            return next(new Error(e))
        }
    }
};

export default auth;