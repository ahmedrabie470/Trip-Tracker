
export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({...req.body,...req.params,...req.query}, { abortEarly: false });
    if (!error) {
      next();    
    } 
    
    else {
      res.json({ error :"error" , error});
    }
  };
};
