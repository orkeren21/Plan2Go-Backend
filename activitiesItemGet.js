/**
 * Created by liorbu on 12/08/2017.
 */
var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Activities",
    Key:{
        "date": "2017-08-12",
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
