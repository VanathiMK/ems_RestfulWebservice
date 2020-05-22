
module.exports = (dynamoose)=>{
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
    },{
        "create":true
    });
    
    const EmpModel = dynamoose.model("EmployeeTable",schema);
    return EmpModel;
};