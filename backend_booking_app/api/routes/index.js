import auth from "../controllers/authController";
import validateAuth from '../middlewares/auth';
import events from "../controllers/eventsController";
import authorize from "../middlewares/authorize";
export const routes = (app)=> {
    app.get('/',(req,res)=>{res.send({message:"welcome"})}),

    
    app.post('/api/auth/sign_up/',validateAuth,auth.signUp),
    app.post('/api/auth/sign_in/', auth.signIn),
    app.post('/api/auth/forgot_password/',auth.sendResetLink);
    app.post('/reset_password/:token',auth.resetPassword);
    
    app.post('/api/events/',authorize,events.create );
    app.get('/api/events/',authorize,events.fetchAll );
    app.get('/api/events/:eventId/',authorize,events.fetchOne );
    app.put('/api/events/',authorize,events.update );
    app.delete('/api/events/:eventId/',authorize,events.delete );
}