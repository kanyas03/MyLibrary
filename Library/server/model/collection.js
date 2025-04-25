import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
});

const Collection = mongoose.model('Collection', collectionSchema);
export { Collection };
