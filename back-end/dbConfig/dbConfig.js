import mongoose from "mongoose";

const dbconnection =async(req,res)=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL+"/Trade_Hub");
        if(connection){
            console.log(`db connected at ${connection.host} `);
        }    
    } catch (error) {
         process.exit(1);
        res.status(500).json({
            success : false,
            message : error.message
        })
       
    }
    
    
}  

export default dbconnection;                    