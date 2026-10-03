class apiError extends Error {
    constructor(
        statusCode,
        message = 'something ewnt wrong',
        errors=[],
        stack = ""
    ){
        super(message)
        thiss.statusCode  = statusCode
        this.data = null
        this.message = message
        this.success= false;
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError}