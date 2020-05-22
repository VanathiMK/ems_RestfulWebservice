const Employee=require('./CreateTableDynamoose');
const dynamoose = require("dynamoose");
dynamoose.aws.sdk.config.update({
    "accessKeyId": "AKID",
    "secretAccessKey": "SECRET",
    "region": "us-east-1"
  });
  
  const ddb=new dynamoose.aws.sdk.DynamoDB();

dynamoose.aws.ddb.set(ddb);
  dynamoose.aws.ddb.local();
  const schema = new dynamoose.Schema({
    "id": {
       "type": Number,
        "hashKey":true
    },
    "firstName": String,
    "surName":String,
    "email":String,
    "dob":String,
    "gender":String
},{"create": true});

  async function getEmployee(id){
    const user = await Employee.get(121);
    console.log(user);
}
getEmployee(121);