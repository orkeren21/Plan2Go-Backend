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

    docClient.put(params, function(err, data){
        if (err) {
            console.error("Error while adding data: " + JSON.stringify(err));
            res.send("Error while adding data: " + JSON.stringify(err));
        } else {
            console.log("Successfully added data.");
            res.send("Successfully added data");
        }
    });
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