class AppError extends Error {
    constructor(statusCode,message = "something went wrong..."){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructure);
    }

}

export default AppError;