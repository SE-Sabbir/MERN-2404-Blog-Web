const cloudinary = require('cloudinary').v2

    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadToCloudinary =(imageBuffer) =>{
        const base64 = imageBuffer.toString("base64")
        const dataURL = `data:image/jpeg;base64,${base64}`
        return cloudinary.uploader.upload(dataURL, {
            folder: "blog_profile"
        })
    }
    const deleteFromCloudinary = (avatar)=>{
        const publicId = avatar.split("/").pop().split(".")[0]
        console.log("public id " , publicId)
        return cloudinary.uploader.destroy(`blog_profile/${publicId}`)
    }

module.exports = {uploadToCloudinary , deleteFromCloudinary}