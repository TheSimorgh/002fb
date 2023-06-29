const express = require("express");
const { authMidd } = require("../middlwares/authMidd");
const {  getReacts, postReact } = require("../controllers/react");
const router = express.Router();
router.put("/reactPost",authMidd,postReact)
router.get("/reactPost/:id",authMidd,getReacts)
module.exports = router;
