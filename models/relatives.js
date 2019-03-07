const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define our relative schema
// title, author, description, image, link, date, relativeId
const relativeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: Array,
  description:String,
  image: String,
  link: String,
  date: String,
  relativeId: String
});

// create our model using mongoose and the schema we just created
const relatives = mongoose.model("relatives", relativeSchema);

module.exports = relatives;
