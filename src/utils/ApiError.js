class ApiError extends  Error {
constructor(
statusCode,
message =  "SomeThing Went Wrong",
errors = [],
stack = ""
){
    super(message)
    this.statusCode = statusCode
    this.data  = null   // Response me data null hoga jab error aaye
    this.message = message   
    this.success =  false
    this.errors = errors   // optional
   
if(stack){
    this.stack = stack
} else {
    Error.captureStackTrace(this, this.constructor)  // error kahan se originate hua (kaunsi file / line number).
}
}

}
export {ApiError}