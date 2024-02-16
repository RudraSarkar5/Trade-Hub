
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
      cb(new multer.MulterError("file formate is not supported"),false);
    }
}



const upload = multer ({
   storage : storage,
   fileFilter : fileFilter,
   limits : {
    fileSize : 5 * 1024 * 1024
   }
})

// this function will invoke if any error pass from multer  
const handleMulterError =(err,req,res,next)=>{
   if(err instanceof multer.MulterError){
     console.log("multer error");
     res.status(400).json({
      success : false,
      message : err.message
     })
   }else{
        console.log("cb error");
        res.status(400).json({
        success: false,
        message: err.message,
      });
   }
}

export {upload,handleMulterError};