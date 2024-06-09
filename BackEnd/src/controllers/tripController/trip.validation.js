import joi  from "joi"


export const tripSchema = joi.object({
    origin:joi.string().min(5).max(50).required(),
    destination:joi.string().min(3).max(50).required(5),
    status: joi.string().valid('scheduled', 'in_progress', 'completed').required(),
    startDate: joi.date().required(), 
    endDate: joi.date().required().greater(joi.ref('startDate'))  
  })



   
  