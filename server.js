const express=require('express');

const bodyParser = require('body-parser');
const cors=require("cors");

const app = express();


const dynamoose = require("dynamoose");
dynamoose.aws.sdk.config.update({
  "accessKeyId": "AKID",
  "secretAccessKey": "SECRET",
  "region": "us-east-1"
});

const ddb=new dynamoose.aws.sdk.DynamoDB();
dynamoose.aws.ddb.set(ddb);
dynamoose.aws.ddb.local();
exports.EmpModel= require("./models/Employee.model")(dynamoose);

var corsOptions={
origin:"http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./Routes/Employee.routes")(app);


app.get("/ems/employee/",(request,response)=>{
  console.log("request received");
 response.json({
   message:"you have hit employee service running on port 8081"
 });
});

const port=8081;
app.listen(port,()=>{
console.log("server running on port "+port);
});

