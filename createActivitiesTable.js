/**
 * Created by liorbu on 12/08/2017.
 */

var AWS = require('aws-sdk');

// AWS.config.update({
//     region: 'us-west-2',
//     endpoint: 'http://localhost:8000'
// });

AWS.config.update({
    region: 'us-west-2',
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var dynamoDB = new AWS.DynamoDB();

var params = {
    TableName: 'Activities',
    KeySchema: [
        { AttributeName: "date", KeyType: "HASH"},  //Partition key
        { AttributeName: "startHour", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "date", AttributeType: "S" },
        { AttributeName: "startHour", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamoDB.createTable(params, function (err, data) {
    if (err) {
        console.error('Error while creating table' + JSON.stringify(err));
    } else {
        console.log('Created table ' + JSON.stringify(data));
    }
});


