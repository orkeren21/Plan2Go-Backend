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

router.post('/addPlan', function(req, res){
    var params = {
        TableName: "Plans",
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

router.get('/getAllEvents', function(req, res) {
    //TODO: Need to look into this more in detail
    //Cannot join Plan + Events since this is not relational DB
    var params = {
        TableName: "Attractions",
        Key: {
            "PlanID": parseInt(req.query.PlanID)
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


router.post('/updatePlan', function(req, res){
    var newValues = req.body;

    var params = {
        TableName: "Plans",
        Key: {
            "PlanID": parseInt(req.query.PlanID)
        },
        UpdateExpression: "set StartDate = :sd, EndDate=:ed, TotalBudget=:tb",
        ExpressionAttributeValues:{
            ":sd": newValues.StartDate,
            ":ed": newValues.EndDate,
            ":tb": parseInt(newValues.TotalBudget)
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