const express = require("express");
var bodyParser = require('body-parser')
const sequelize = require("./config/database");
const Contact = require("./controllers/Contact");
var cors = require('cors')

sequelize
  .sync({ force: true })
  .then(() => console.log("Sqlite Database is connected to node.js"));

const app = express();
app.use(cors())

var jsonParser = bodyParser.json();
  
app.get("/contacts",jsonParser, async(req, res) => {
  try {
    console.log(req.body);
    const contact = await Contact.findAll();
    res.json(contact);
  }
  catch(err) {
    console.log(err);
    res.send("Error Fetching data")
  }
});

app.post("/contacts",jsonParser, async(req, res) => {
  try {
    console.log(req.body);
    const contact = await Contact.create(req.body);
    contact.save()
    res.send("New Contact is inserted successfully!");
  }
  catch(err) {
     console.log(err);
     res.send("Error During Insertion");
  }
});

app.get("/contacts/:id",jsonParser, async(req, res) => {
  try {
    console.log(req.body)
    const contactID = req.params.id;
    const contact = await Contact.findOne({
      where: { id: contactID },
    });
    res.send(contact);
  }
  catch(err) {
     console.log(err);
     res.send(`Error while finding particular ID`);
  }

});

app.put("/contacts/:id", jsonParser , async(req, res) => {
  try {
    console.log(req.body)
    const contactID = req.params.id;
    const contact = await Contact.findOne({ where: { id: contactID } });
    contact.fullName = req.body.fullName;
    contact.email = req.body.email;
    contact.designation = req.body.designation;
    contact.save();
    res.send(`Contact Updated Successfully!`);
  }
  catch(err) {
   console.log(err)
   res.send(`Error while Updating Data`)
  }
});

app.delete("/contacts/:id",jsonParser, async(req, res) => {
  try {
    console.log(req.body)
    const contactID =  req.params.id;
    await Contact.destroy({ where: { id: contactID } });
    res.send(`User Deleted Successfully!`);
  }
 catch(err) {
   console.log(err)
   res.send(`There is some issue while removing contact`)
 }
  
});
 
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/contacts`);
});

