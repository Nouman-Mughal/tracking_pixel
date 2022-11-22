const mongoose = require("mongoose");
// defining Address Schema
const addressSchema = new mongoose.Schema(
  {
    unitNo: {
      type: String,
      trim: true,
      uppercase: true,
    },
    street: {
      type: String,
      trim: true,
      uppercase: true,
    },
    city: {
      type: String,
      trim: true,
      uppercase: true,
    },
    zip: {
      type: String,
      trim: true,
      uppercase: true,
    },
    state: {
      type: String,
      trim: true,
      uppercase: true,
    },
    country: {
      type: String,
      trim: true,
      uppercase: true,
    },
  },
  {
    _id: false,
  }
);

module.exports = {
  addressSchema,
};
