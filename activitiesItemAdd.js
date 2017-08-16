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
    Item:{
        "date": "2017-08-12",
        "startHour": "08:00",
        "endHour": "10:00",
        "info":{
            "title": "Breakfast",
            "description": "Desc of the restaurant"
        }
    }
};

docClient.put(params, function (err, data) {
   if (err) {
       console.error("Error while adding data: " + JSON.stringify(err));
   } else {
        console.log("Successfully added data\n:" + JSON.stringify(data));
   }
});
