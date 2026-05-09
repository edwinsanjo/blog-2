import fs from 'fs';
import path from 'path';

const vaultPath = path.join(process.cwd(), 'vault');

export default function handler(req, res) {
  const { slug } = req.query;
  const filePath = path.join(vaultPath, ...slug);

  try {
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': `image/${path.extname(filePath).substring(1)}`,
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (e) {
    res.status(404).send('Image not found');
  }
}
