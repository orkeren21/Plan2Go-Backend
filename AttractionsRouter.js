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

router.post('/addAttraction', function(req, res){
    var params = {
        TableName: "Attractions",
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

router.get('/getAttraction', function(req, res) {
    var params = {
        TableName: "Attractions",
        Key: {
            "AttractionID": parseInt(req.query.AttractionID)
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Error while getting data: " + JSON.stringify(err));
        } else {
            console.log("Successfully get data: \n" + JSON.stringify(data));
            res.send(data)
        }
    });
});

router.delete('/deleteAttraction', function(req, res){
    var params = {
        TableName: "Attractions",
        Key: {
            "AttractionID": parseInt(req.query.AttractionID)
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

router.post('/updateAttraction', function(req, res){
    var newValues = req.body;

    var params = {
        TableName: "Attractions",
        Key: {
            "AttractionID": parseInt(req.query.AttractionID)
        },
        UpdateExpression: "set Title = :t, ExtraInfo=:e, Price=:p, VisitDuration=:d, AttractionLocation=:l, OpeningTimes=:o",
        ExpressionAttributeValues:{
            ":t": newValues.Title,
            ":e": newValues.ExtraInfo,
            ":p": parseInt(newValues.Price),
            ":d": parseInt(newValues.VisitDuration),
            ":l": newValues.AttractionLocation,
            ":o": newValues.OpeningTimes
        }
    };

    docClient.update(params, function(err, data){
        if (err) {
            console.error("Error while updating data: " + JSON.stringify(err));
            res.send("Error while updating data: " + JSON.stringify(err));
        } else {
            console.log("Successfully updated data.");
            res.send("Successfully updated data");
        }
    });
});

module.exports = router;