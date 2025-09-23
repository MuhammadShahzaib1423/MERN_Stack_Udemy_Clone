import { clerkWebhooks } from "../controllers/webhooks";

const express = require("express");
const {registerUser, loginUser}= require("../controllers/User");
const router = express.Router();
router.post('/clerk',express.json(),clerkWebhooks)

module.exports = router;