const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

async function uploadToSpaces(name, file) {
  const s3Client = new S3Client({
    endpoint: process.env.DO_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    region: 'us-east-1', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
    credentials: {
      accessKeyId: process.env.DO_ACCESS_KEY_ID,
      secretAccessKey: process.env.DO_SECRET_KEY,
    },
  });

  // Step 3: Define the parameters for the object you want to upload.
  const params = {
    Bucket: process.env.DO_BUCKET_NAME, // The path to the directory you want to upload the object to, starting with your Space name.
    Key: name, // Object key, referenced whenever you want to access this file later.
    Body: file, // The object's contents. This variable is an object, not a string.
    ACL: 'public-read', // Defines ACL permissions, such as private or public.
    Metadata: {
      'x-amz-meta-my-key': 'your-value',
    },
  };

  // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
  const uploadObject = async () => {
    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log(
        `Successfully uploaded object: ${params.Bucket}/${params.Key}`
      );
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  };

  // Call the uploadObject function.
  uploadObject();
}

module.exports = uploadToSpaces;
