import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utilits/AppError.js";


export const fileUpload = (fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload.single(fieldName); // Attach the uploaded file to the fieldName in the request body
};
