//   async error handling wrapper
// const asyncHandler =  (fn) =>  { async (req, res, next) => {
// try {
//  return  await fn(req, res, next )
// } catch(error){
//     res.status(error.code || 500 ).json({
//         succcess : false,
//         messsage :  error.messsage
//     })
// }

// }}

const asyncHandler = (ReqHandler) => {
return (req, res, next)=> {
Promise.resolve(ReqHandler(req, res, next)).catch((error) => next(error))
} 
}



export { asyncHandler }