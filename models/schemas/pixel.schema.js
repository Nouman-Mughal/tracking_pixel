const mongoose = require("mongoose");
const eventSchema = require("./events.schema");
const utmSchema = require("./utm.schema");
const pixelSchema = new mongoose.Schema(
  {
    pixel_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    //utm stands for  Urchin Tracking Module
    utm: {
      type: utmSchema,
      required: true,
    },
    browser_name: {
      type: String,
      required: true,
    },
    events: {
      type: eventSchema,
      required: true,
    },
    //any kind of optional data we can send with pixel.
    optional_data: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Pixel = mongoose.model("pixel", pixelSchema);
module.exports = {
  Pixel,
};
