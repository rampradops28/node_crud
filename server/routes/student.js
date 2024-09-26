const express  =  require("express");
const router = express.Router();
const studcontroller = require('../controller/studentcontroller')

//view all records
router.get('/',studcontroller.view)

//add new records
router.get('/adduser',studcontroller.adduser)
router.post('/adduser',studcontroller.save)

//edit records
router.get('/edituser/:id',studcontroller.edituser)
router.post('/edituser/:id',studcontroller.edit)
                                                                                                                                                                                                                                        
//delete records
router.get('/deleteuser/:id',studcontroller.deleteuser)

// router.get('',((req,res) => {
//     res.render("home") 
// }));

module.exports=router;