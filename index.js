const express = require("express");
const app = express();
const { initialiseDatabase } = require("./db/db.connect");
const Event = require("./models/events.model");

app.use(express.json());

initialiseDatabase();

// async function createEvent(newEvent) {
//   try {
//     const event = await Event.insertMany(newEvent);
//     console.log(event);
//   } catch (error) {
//     console.error("Error saving events:", error);
//   }
// }

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE", // Allow necessary methods

  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


async function createEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    const savedEvent = await event.save();
    return savedEvent;
  } catch (error) {
    console.error("Error saving events:", error);
  }
}

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    res
      .status(201)
      .json({ message: "Event added successfully", event: savedEvent });
  } catch (error) {
    res.status(404).json({ error: "Failed to add the event." });
  }
});

async function readAllEvents() {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the events." });
  }
});

async function getEventByType(eventType) {
  try {
    const event = await Event.find({ type: eventType });
    return event;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/types/:eventType", async (req, res) => {
  try {
    const events = await getEventByType(req.params.eventType);
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch the events." });
  }
});

async function getEventByTags(eventTag) {
  try {
    const event = await Event.find({ "eventDetail.tags": eventTag });
    return event;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/tags/:eventTag", async (req, res) => {
  try {
    const events = await getEventByTags(req.params.eventTag);
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to fetch the events." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
