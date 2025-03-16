const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary với API key của bạn
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Thay bằng cloud_name của bạn
  api_key: process.env.CLOUD_API_KEY, // Thay bằng API Key của bạn
  api_secret: process.env.CLOUD_API_SECRECT, // Thay bằng API Secret của bạn
});

module.exports = cloudinary;
