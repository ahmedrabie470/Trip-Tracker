import joi  from "joi"


export const staticTripSchema = joi.object({
    origin:joi.string().min(5).max(50).required(),
    destination:joi.string().min(5).max(50).required(),
    status: joi.string().valid('scheduled', 'in_progress', 'completed').required(),
    img:joi.string(),
    startDate: joi.date().iso().required(), 
    endDate: joi.date().iso().required().greater(joi.ref('startDate'))  
  })



   
  