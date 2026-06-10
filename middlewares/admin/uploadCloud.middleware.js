const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

module.exports.upload = async (req, res, next) => {

    if(req.file){

        const streamUpload = (req) => {

            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    (error, result) => {

                        if(result){
                            resolve(result);
                        }
                        else{
                            reject(error);
                        }
                    }
                );

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);

            });

        };

        const result = await streamUpload(req);
        req.body[req.file.fieldname] = result.secure_url;
    }

    next();
};