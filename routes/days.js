var dayRouter = require('express').Router();
var Day = require('../models').Day;
var attractionRouter = require('./index'); //require('express').Router();


// GET /days
dayRouter.get('/', function (req, res, next){
	// serves up all days as json
	Day
		.find({})
		.exec(function (err, days){
			if(err) return next(err);
			res.json(days);
		})
});

// POST /days
dayRouter.post('/', function (req, res, next){
	// creates a new day and serves it as json
	var day = new Day();
	day.save(function(err, day){
		if(err) return next(err);
		res.json(day);
	});
});

// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
    Day.findById(req.params.id)
    	.exec(function(err, day){
    		if(err) return next(err);
    		res.json(day);
    	})
});

// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
    Day.findById(req.params.id)
    	.exec(function(err, day){
    		if(err) return next(err);
    		day.remove(function(err){
    			if(err) return next(err);
    			res.send(day);
    		})
    	})
});

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = dayRouter;