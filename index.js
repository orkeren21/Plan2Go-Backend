const express = require('express');
const bodyyParser = require('body-parser');
const app = express();
app.use(bodyyParser.json());

var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-west-2',
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();

app.post('/createActivity', function (req, res) {
    var params = {
        TableName: "Activities",
        Item: req.body
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Error while adding data: " + JSON.stringify(err));
            res.send("Error while adding data: " + JSON.stringify(err));
        } else {
            console.log("Successfully added data.");
            res.send("Successfully added data");
        }
    });
});

app.get('/activity', function (req, res) {
    var params = {
        TableName: "Activities",
        Key:{
            "date": req.query.date,
            "startHour": "08:00"
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Error while getting data: " + JSON.stringify(err));
        } else {
            console.log("Successfully get data: \n" + JSON.stringify(data));
        }
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});