import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


// Get the directory path of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the destination directory as a relative path
const destinationDirectory = path.join(__dirname, "../../public/upload");




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    
    cb(null, file.fieldname+"-" + uniqueSuffix+".jpg");
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
   
    cb(new Error("File format is not supported",400));
  }
};



const upload = multer ({
   storage : storage,
   fileFilter : fileFilter,
   limits : {
    fileSize : 5 * 1024 *1024
   }
})



export {upload};