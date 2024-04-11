const handleError = (err,req,res,next)=>{
    console.log(err);
    console.log(err.stack);
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || "something went wrong";
    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
}

export {handleError}