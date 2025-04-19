const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const presignUrl = async (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: "Missing 'filename' query param." });
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: `meetings/${filename}`,
    ContentType: "audio/wav",
    Expires: 300, // 5 minutes
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    // console.log(url);
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating pre-signed URL." });
  }
};
module.exports =  { presignUrl };
