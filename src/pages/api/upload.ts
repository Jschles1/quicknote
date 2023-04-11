// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import multiparty from 'multiparty';
// import fs, { ReadStream } from 'fs';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const awsConfig = {
//     region: process.env.MY_AWS_REGION,
//     credentials: {
//         accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//         secretAccessKey: process.env.MY_AWS_SECRET_KEY,
//     },
// };

// const s3 = new S3Client(awsConfig);

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     const session = await getSession({ req });
//     if (session && req.method === 'POST') {
//         try {
//             const form = new multiparty.Form();
//             let uploadFile: ReadStream;
//             let fileName: string;

//             form.parse(req, async (uploadError, _, files) => {
//                 if (uploadError) {
//                     throw new Error('Error parsing data: ' + uploadError.stack);
//                 }

//                 if (files.upload) {
//                     uploadFile = fs.createReadStream(files.upload[0].path);
//                     fileName = files.upload[0].originalFilename;

//                     const putCommand = new PutObjectCommand({
//                         Bucket: process.env.MY_AWS_BUCKET_NAME,
//                         Key: fileName,
//                         Body: uploadFile,
//                     });
//                     const result = await s3.send(putCommand);
//                     res.status(200).json({ result });
//                 }
//             });
//         } catch (e: any) {
//             res.status(500).json({ message: e.message });
//         }
//     } else {
//         res.status(401).json({ message: 'Unauthenticated' });
//     }
// };

// export default handler;
