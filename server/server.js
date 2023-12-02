const express = require("express");
const server = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
	"mongodb://localhost:27017/assignment2",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error) => {
		if (error) {
			console.log("error");
		} else {
			console.log("DB connected !!!");
		}
	},
);

const port = 8000;

server.use(
	cors({
		origin: ["http://localhost:8000"],
	}),
); // Enable CORS for all routes
server.use(express.json());
server.use(routes);

server.listen(port, (error) => {
	if (error) {
		console.log("error");
	} else {
		console.log("startedddd");
	}
});
