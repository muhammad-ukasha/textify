const fs = require("fs");
const path = require ("path");

const axios = require("axios");


const getAudio = async (req, res) => {
    // console.log('File received:', req.file);
    
    // res.status(200).send('File uploaded successfully')
    // console.log(req)  
  const filePath = path.join(__dirname, "uploads", req.file.filename);

  console.log(`📥 Received file: ${filePath}`);

//   OPTIONAL: Upload to S3 using presigned URL
//   try {
//     const presignedUrlRes = await axios.get(
//       `https://localhost:3000/api/v1/presigned-url?filename=${req.file.filename}`
//     );
//     await axios.put(presignedUrlRes.data.url, fs.readFileSync(filePath), {
//       headers: { "Content-Type": "audio/wav" },
//     });
//     console.log("✅ Uploaded to S3");
//   } catch (err) {
//     console.error("❌ Failed to upload to S3", err);
//   }

//   res.json({ status: "success" });
};

module.exports = { getAudio };
