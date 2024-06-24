import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL: {
    type: String,
    required: true
  },
  visitHistory: [{
    timestamp: {
      type: Number
    }
  }],
  genratedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
},
  {
    timestamps: true  // Corrected from `timestamp` to `timestamps`
  }
);

const URL = mongoose.model("url", urlSchema);

export default URL;
