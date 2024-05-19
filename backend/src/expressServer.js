const { app } = require("./server");

app.get("/",(req,res)=>res.status(200).send("Live review service is running"))
app.use('/review',require("./routes/reviewRoute"))


module.exports = app