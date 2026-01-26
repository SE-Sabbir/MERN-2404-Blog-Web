const cloudinary = require('cloudinary').v2

    cloudinary.config({ 
        cloud_name: "dxr5inpsy", 
        api_key: "288775511976338",
        api_secret: "eUJZp8lk54P0zf5mKM9WncCrWPw"
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