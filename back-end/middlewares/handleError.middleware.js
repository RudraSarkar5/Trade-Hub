const handleError = (err,req,res)=>{
    // console.log(err.stack);
    return res.status(err.statusCode).res.json({
        success : false,
        message : err.message
    })
}

export {handleError}