const db=require("../models");
const fs=require("fs");
const dynamoose=require('dynamoose');
const EmployeeModel =db.EmployeeModel;

function getNextID(){
    var nextID;
    try{
    var buff= fs.readFileSync("./config/NextID.txt","utf-8");
  
    console.log(buff);

    nextID =Number(buff.toString());
    console.log("Next id from file :" +nextID);
    var updatedId=nextID+1;
    var toFile=updatedId.toString();
    fs.writeFile("./config/NextID.txt",toFile,(error)=>{
        if(error){
            console.log("Error writing file "+ error);
        }
       else  console.log("written value "+toFile);
    });
    }catch(error){
    console.log("Error accessing NextID.txt "+ error);
        nextID=301;
    }
    return nextID;
}
//Defining the crud operations
//If the corresponding id is not present,then create else update
exports.createOrSave=async(request,response)=>{
    const id = getNextID();
    console.log("gen id is :"+id);
    const id1=Number(id);
    const emp1= new EmployeeModel({ 
        "id":id1,
        "firstName": request.body.firstName,
        "surName":request.body.surName,
        "email":request.body.email,
        "dob":request.body.dob,
        "gender":request.body.gender
    });
    try{
    await EmployeeModel.create(emp1,(error)=>{
        if (error){
            console.log("emp "+emp1.id + emp1.firstName +emp1.surName+emp1.gender+emp1.dob+emp1.email);
            console.log("error creating employee "+error);
            response.json({
                message:"Error"
            });
        }
    else{
    console.log("Employee created with id: "+ id + emp1);
        response.json({
            message: "Success",
            id:id
        });
    }
    });
        }
        catch(error){
            console.log("Error saving employee!!!" +error);
            response.json({
                emp:emp1,
                message: "employee not added"
            });}
    

};

//Function to get employee by id
exports.getEmployee=async (request,response)=>{
console.log("get request receivd");
try{ 
    console.log(request.originalUrl);
    const id = Number(request.params.id);
    console.log(id);
    await  EmployeeModel.get(id,(error,employee)=>{
         if(employee != null){
             response.status(200).json({
                emp: employee,
                message: "Success"
             });
         }else{
             console.log("emp null");
             response.status(404).json({
                 message: "Not found",
                 emp:employee
             });
         }
        if(error){
            console.log("db error ");
            response.status(404).json({
                
                message: "Employee not found in db  " + error
            });
        }
    });
    
}catch(error){
    console.error(error);
    response.json({
        message: "Error retrieving employee " +error
    });
}


}
//Delete employee given the id
exports.deleteEmployee=async(request,response)=>{
 const id=Number(request.params.id)   ;
 try{
     
await EmployeeModel.delete(id);
    console.log("Delete called on id " + id)
    response.json({
    message: "Success"
    });
    
 }
catch(error){
    response.json({
    message:"Error" + error
});
 }

}
exports.updateEmployee=async(request,response)=>{
 const id1 = request.params.id;
 console.log("Entered update "+id1);
 const id2=Number(id1);
    const emp={
        "id":id2,
        "firstName":request.body.firstName,
        "surName":request.body.surName,
        "email":request.body.email,
        "dob":request.body.dob,
        "gender":request.body.gender
    };   
   
try{
    //const condition = new dynamoose.Condition().where("id").eq(id2);
 console.log("id   "+id2);
    await EmployeeModel.update(emp,(error,employee)=>{
        console.log("update!!");
        if(error){
            console.log("Error on updating "+error);
            response.json({
                message:"error",
                emp:employee
            });
        }else{
            console.log("update succesful");
            response.json({
               message: "Success",
                emp:employee
            });
        }
    });
    
}catch(error){
    console.log("Error in update "+ error);
    response.json({
        message:"Error while updating "+error
    });
}
}