const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
  var now = new Date().toString();
  var logs = `${now}: ${req.method} ${req.url}`;

  fs.appendFile("server.log", logs + "\n", (err) => {
    if(err){
      console.log("Unable to append logs in server.log file");
    }
  });
  console.log(logs);
  next();
});
// app.use((req, res, next) => {
//   res.render("maintainance.hbs", {
//     pageTitle: "Maintainance Page",
//     message: "The website is currently under maintainance, come back later!"
//   });
// });
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "welcome to my website"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill this request"
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
