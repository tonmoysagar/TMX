import auth from "../controllers/authController";
import validateAuth from '../middlewares/auth'
export const routes = (app)=> {
    app.get('/',(req,res)=>{res.send({message:"welcome"})}),
    app.post('/api/auth/sign_up/',validateAuth,auth.signUp),
    app.post('/api/auth/sign_in/', auth.signIn)
}