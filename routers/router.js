
// Importing express module
const express = require("express")
  
// Creating express router
const router = express.Router()
  
// Handling request using router
router.get("/", (req,res) => {
    res.send("This is the homepage request")
})
  
// Exporting router
module.exports = router