const mongoose = require('mongoose');
require("./expressServer")

mongoose.connect("mongodb+srv://1978sameerbajaj:Sameer2002@cluster0.mabhqid.mongodb.net/solvative", {useNewUrlParser: true})
  .then(() => console.log('mongodb running on 27017'))
  .catch(err => console.log(err))

