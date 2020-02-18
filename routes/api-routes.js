// Requiring our models and passport as we've configured it
var db = require("../models");
var axios = require("axios");
var moment = require("moment");
// var passport = require("../config/passport");

const flights = [];

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // (req, res, next) => { ...code; next();}
  //   app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //     res.json(req.user);
  //   });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  //   app.post("/api/signup", function(req, res) {
  //     db.User.create({
  //       email: req.body.email,
  //       password: req.body.password
  //     })
  //       .then(function() {
  //         res.redirect(307, "/api/login");
  //       })
  //       .catch(function(err) {
  //         res.status(401).json(err);
  //       });
  //   });

  // Route for logging user out
  //   app.get("/logout", function(req, res) {
  //     req.logout();
  //     res.redirect("/");
  //   });

  // Route for getting some data about our user to be used client side
  app.post("/api/citySearch", function(req, res) {
    console.log("apiFlights", req.body);
    const cityFrom = req.body.cityFrom;
    const cityTo = req.body.cityTo;
    const queryUrl = `https://api.skypicker.com/flights?flyFrom=${cityFrom}&to=${cityTo}&dateFrom=18/11/2020&dateTo=12/12/2020&partner=picky&v=3&USD`;
    axios.get(queryUrl).then(function(data) {
      // console.log(data.data);
      var dataArr = data.data.data;

      console.log(typeof dataArr);
      console.log(dataArr);

      dataArr.forEach(function(flight) {
        // console.log(flight);
        flights.push(
          "Price",
          flight.price,
          "Duration",
          flight.fly_duration,
          "DepartureTime",
          moment.unix(flight.dTime).format("MM/DD/YYYY"),
          "ArrivalTime",
          moment.unix(flight.aTime).format("MM/DD/YYYY"),
          "Airline",
          flight.airline
        );
      });
      res.json(flights);
    });
  });
};
