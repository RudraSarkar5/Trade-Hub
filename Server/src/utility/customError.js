class AppError extends Error {
    constructor(message = "something went wrong...",statusCode=500){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructure);
    }

}

export default AppError;