var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
router.use(bodyParser.json());

router.post('/addEvent', function(req, res){
    var params = {
        TableName: "Events",
        Item: req.body
    };

    //When we add an event, we need to update the current plan, and add event params to it
    //Meaning, addEvent needs planID on request,
    //TODO: Need to rethink keys for events, looks like events need their own EventID
    var planID = parseInt(req.body.PlanID);
    var planParams = {
        TableName: "Plans",
        Key: {
            "PlanID": planID
        },
        UpdateExpression: "SET EventsList = list_append(EventsList, :p)",
        ExpressionAttributeValues:{
            ":p": [
                {
                    "EventDate": req.body.EventDate,
                    "StartTime": req.body.StartTime,
                    "Duration": req.body.Duration,
                    "AttractionName": "test"
                }
            ]
        }
    };

    docClient.put(params, function(err, data){
        if (err) {
            console.error("Error while adding data: " + JSON.stringify(err));
            //res.send("Error while adding data: " + JSON.stringify(err));
        } else {
            console.log("Successfully added data.");
            //res.send("Successfully added data");
        }
    });

    docClient.update(planParams, function(err, data){
        if (err) {
            console.error("Error while updating data: " + JSON.stringify(err));
            res.send("Error while updating data: " + JSON.stringify(err));
        } else {
            console.log("Successfully updated data.");
            res.send("Successfully updated data");
        }
    })
});

router.delete('/deleteEvent', function(req, res){
    var params = {
        TableName: "Events",
        Key: {
            "EventDate": req.query.EventDate,
            "StartTime": req.query.StartTime
        }
    };

    docClient.delete(params, function(err, data){
        if (err) {
            console.error("Error while deleting item: " + JSON.stringify(err));
            res.send("Error while deleting item: " + JSON.stringify(err));
        } else {
            console.log("Successfully deleted item: \n" + JSON.stringify(data));
            res.send(data)
        }
    })
});

module.exports = router;