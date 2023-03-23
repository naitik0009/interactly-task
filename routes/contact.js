const express = require("express");
const router = express.Router();
const {getAllContacts,getContact,createContact,updateContact,deleteContact} = require("../controller/zoho.actions"); 
router.route("/contacts/getAllContacts").post(getAllContacts);
router.route("/contacts/createContact").post(createContact);
router.route("/contacts/getContact/:id").post(getContact);
router.route("/contacts/updateContact/:id").put(updateContact);
router.route("/contacts/deleteContact/:id").delete(deleteContact);

module.exports = router;