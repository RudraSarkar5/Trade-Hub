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


const fileFilter = function(req,file,cb){
     
    const ext = path.extname(file.originalname);
    if(ext == ".jpg" || ext == ".png" || ext == ".jpeg" || ext == ".webp"){
      
      cb(null,true);
    }else{
      // this is a custom error 
      cb(new Error("file formate is not supported"));
    }
}



const upload = multer ({
   storage : storage,
   fileFilter : fileFilter,
   limits : {
    fileSize : 5 * 1024 *1024
   }
})

// this function will invoke if any error pass from multer  
const handleMulterError =(err,req,res,next)=>{
   if(err instanceof multer.MulterError){
        res.status(400).json({
          success: false,
          message: err.message
        });
      }else{
        res.status(400).json({
        success: false,
        message: err.message,
      });
   }
}

export {upload,handleMulterError};