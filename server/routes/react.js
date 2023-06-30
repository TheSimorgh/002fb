const express = require("express");
const { authMidd } = require("../middlwares/authMidd");
const { postReact, getReacts } = require("../controllers/react");
const router = express.Router();
router.put("/postReact",authMidd,postReact)
router.get("/getReacts/:id",authMidd,getReacts)
module.exports = router;
