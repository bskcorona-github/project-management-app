import mongoose from 'mongoose';

const wikiSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wiki = mongoose.model('Wiki', wikiSchema);

export default Wiki;
