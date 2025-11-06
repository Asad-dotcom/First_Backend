import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
cloudinary.config({
     cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const uploadOncloudinary = async (localFilePath) =>  {
try{
if(!localFilePath) return null
const respone =  await cloudinary.uploader.upload(localFilePath, {
    resource_type : "auto"
})
console.log("File has Upload Sucesfully", respone.url)
return respone

}
catch(error){
fs.unlink(localFilePath) //remove the locally saved temporary file as the upload operation got failed 
return null
}
}



export {uploadOncloudinary}







// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dlsz0alee', 
//         api_key: '999262441969647', 
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.v2.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();