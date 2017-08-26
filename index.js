const express = require('express');
const app = express();
var AttractionsRouter = require("./AttractionsRouter");
var EventsRouter = require("./EventsRouter");
var PlansRouter = require("./PlansRouter");


//TODO: Should we configure the AWS SDK once in the server? and export it?

app.use("/attractions", AttractionsRouter);
app.use("/events", EventsRouter);
app.use("/plans", PlansRouter);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});