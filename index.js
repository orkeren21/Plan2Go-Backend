const express = require('express');
const bodyyParser = require('body-parser');
const app = express();
app.use(bodyyParser.json());

var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1',
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();


app.post('/addAttraction', function(req, res){
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

app.get('/getAttraction', function(req, res) {
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

app.delete('/deleteAttraction', function(req, res){
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

app.post('/updateAttraction', function(req, res){
    //TODO: Does not work, need to look into it
    var newValues = req.body;

    var params = {
        TableName: "Attractions",
        Key: {
            "AttractionID": parseInt(req.query.AttractionID)
        },
        UpdateExpression: "set info.Title = :t, info.ExtraInfo=:e, info.Price=:p, info.VisitDuration=:d, info.AttractionLocation=:l, info.OpeningTimes=:o",
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

//=============================================
app.post('/addEvent', function(req, res){
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

app.delete('/deleteEvent', function(req, res){
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

//=============================================
app.post('/addPlan', function(req, res){
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

app.get('/getAllEvents', function(req, res) {
    //TODO: Need to look into this more in detail
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


app.post('/updatePlan', function(req, res){
    //TODO: Does not work, need to look into it
    var newValues = req.body;

    var params = {
        TableName: "Attractions",
        Key: {
            "AttractionID": parseInt(req.query.AttractionID)
        },
        UpdateExpression: "set info.Title = :t, info.ExtraInfo=:e, info.Price=:p, info.VisitDuration=:d, info.AttractionLocation=:l, info.OpeningTimes=:o",
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



app.listen(3000, function () {
    console.log('Listening on port 3000');
});