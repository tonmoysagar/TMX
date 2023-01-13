import {Event} from '../models'
const events = {
    async create({body, decoded}, res, next){
        try{
            const {id, username} =  decoded;
            const {scheduledTime, scheduledLat, scheduledLong, title,about, minimumBid} = body;
            const event = await Event.create({scheduledTime, scheduledLat, scheduledLong, title,about, minimumBid, username:username})
            return res.status(201).send(event)
        }catch(e){
            return next(new Error(e));
        }
    },
    async fetchAll({body, decoded}, res, next){
        try{
            const {id, username} =  decoded;
            const events = await Event.findAll({where:{username}})
            return res.status(200).send(events)
        }catch(e){
            return next(new Error(e));
        }
    },
    async fetchOne({params, decoded}, res, next){
        try{
            const {id, username} =  decoded;
            const event = await Event.findOne({where:{eventId:params.eventId, username}})
            if(!event){
                return res.status(404).send({error: "No such event found"})
            }
            return res.status(200).send(event)
        }catch(e){
            return next(new Error(e));
        }
    },
    async update({body, decoded}, res, next){
        try{
            const event = await Event.findOne({where:{eventId:body.eventId, username: decoded.username}})
            if(!event){
                return res.status(404).send({error: "No such event found"})
            }
            const updateObj = {
                scheduledTime: body.scheduledTime|| event.scheduledTime,
                scheduledLat: body.scheduledLat|| event.scheduledLat ,
                scheduledLong: body.scheduledLong || event.scheduledLong,
                title: body.title || event.title,
                about: body.about || event.about, 
                minimumBid : body.minimumBid || event.minimumBid
            }
            const updatedEvent = await Event.update(updateObj, {
                where: {eventId:body.eventId, username: decoded.username},
                returning: true,
                plain: true
            })
            return res.status(200).send(updatedEvent)
        }catch(e){
            return next(new Error(e));
        }
    },
    async delete({params, decoded}, res, next){
        try{
            const {id, username} =  decoded;
            const event = await Event.findOne({where:{eventId:params.eventId, username}})
            if(!event){
                return res.status(404).send({error: "No such event found"})
            }
            event.destroy();
            return res.status(200).send({message:'Successfully deleted'})
        }catch(e){
            return next(new Error(e));
        }
    }
}

export default events;