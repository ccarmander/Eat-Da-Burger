const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

//Get all the data from the DB
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});


//Post a new Burger
router.post("/api/burgers", function (req, res) {
  burger.insertOne(req.body.burger_name, function (result) {
    console.log(result);
    res.json(result);
  });
});


//When Devour button is clicked, updated Devour false to true
router.put("/api/burgers/devoured/:id", function (req, res) {
  const condition = `id = ${req.params.id};`;
  const boolean = req.body.devoured;

  burger.updateOne(boolean, condition, function (result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(202).end();
  });
});


//When Delete button is clicked, Delete the Devour button
router.delete("/api/burgers/:id", function (req, res) {
  const condition = `id = ${req.params.id}`;

  burger.deleteOne(condition, function (result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(202).end();
  });
});


module.exports = router;