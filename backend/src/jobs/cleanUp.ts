import cron from 'node-cron';
import fs from 'fs/promises';
import { ConvertedFile } from '../models/convertedFile.js';

cron.schedule('*/5 * * * *', async () => { //cleanup runs at every 5 mins
  try {
    const now = new Date();
    const expired = await ConvertedFile.find({ expiresAt: { $lt: now } }); //enteries having expireAt less than current time (when the cleanup runs)

    for (const doc of expired) {
      try {
        await fs.unlink(doc.storagePath);//deletes file from a disc
      } catch (err) {
        console.warn(`Could not delete ${doc.storagePath}:`, err);
      }
    }

    const expiredIds = expired.map((doc) => doc._id);
    await ConvertedFile.deleteMany({ _id: { $in: expiredIds } });
  } catch (err) {
    console.error('Cleanup job failed:', err);
  }
});