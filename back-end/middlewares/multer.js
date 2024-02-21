import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+Date.now()+".jpg");
  },
});


const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".heic",
    ".heif",
    ".webp",
  ]; 
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
   
    cb(new Error("File format is not supported"));
  }
};



const upload = multer ({
   storage : storage,
   fileFilter : fileFilter,
   limits : {
    fileSize : 5 * 1024 *1024
   }
})

// this function will invoke if any error pass from multer  
const handleMulterError =(err,req,res,next)=>{
   
        return res.status(400).json({
          success: false,
          message: err.message,
      
        })
}

export {upload,handleMulterError};