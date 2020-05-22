module.exports=app=>{
const empController = require("../controllers/employee.controller.js");
var router = require("express").Router();

router.get("/:id",empController.getEmployee);
router.post("/",empController.createOrSave);
router.delete("/:id",empController.deleteEmployee);
router.put("/:id",empController.updateEmployee);

app.use('/ems/employee',router);
};