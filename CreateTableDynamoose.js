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

const Employee =dynamoose.model("EmployeeTable",schema);
async function createTable(){
    await Employee.table.create.request();
    console.log("completed");
}

console.log("Printing from log " + createTable());


async function addEmployee(){
    const emp1 = new Employee({
        "id": 101,
        "firstName": "Geetha",
        "surName":"Vani",
        "email":"geetha@gmail.com",
        "dob":"21 Nov 1988",
        "gender":"Female"
    });
    await emp1.save((error)=>{
        if(error)
        console.log(error);
        else console.log("Employee saved!!!");
    });

}
addEmployee();
async function getEmployee(id){
    const user = await Employee.get(101,(user)=>{
        console.log(user);
    });
    console.log(user);
}
getEmployee(101);
module.exports=Employee;