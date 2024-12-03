const mongoose = require("mongoose");

const eventDetailSchema = new mongoose.Schema({
  hostedBy: { type: String, required: true },
  details: { type: String, required: true },
  additionalInformation: {
    dressCode: { type: String, required: false },
    ageRestrictions: { type: String, required: false },
  },
  tags: [{ type: String, required: true }],
  location: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  dateTime: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  speakers: [
    {
      name: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
});

const eventSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: false },
  time: { type: String, required: false },
  description: { type: String, required: true },
  image: { type: String, required: true },
  eventDetail: { type: eventDetailSchema, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
