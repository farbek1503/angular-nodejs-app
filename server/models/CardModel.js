const mongoose = require("mongoose");

const CardModelSchema = new mongoose.Schema({
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

module.exports = mongoose.model("Card", CardModelSchema);
