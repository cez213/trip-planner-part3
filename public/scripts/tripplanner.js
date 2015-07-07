// applies a function to each value in the object
function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

// getting day - not doing much
var getAllDays = function (){
	$.get('/days', function(data){
		console.log('GET response data', data);
		for (var i = 0; i < data.length; i++) {
			// create new day for each day in database
			var day = new Day();
			// set id for new day
			day._id = data[i]._id;
			if (data[i].hotel !== null && data[i].hotel) {
				console.log('hotel:', data[i])
				day.hotel = data[i].hotel.name;
			}
			console.log(day)

		}
	})
}

// get day by id -> takes currentDay to get id
var getDayById = function(currentDay){
	$.get('/days/'+currentDay._id, function(data){
		// console.log('GET id response data', data);
	})
}

// storing a new day -> callback takes data, and sets new day to have the same id as the day in the databse (called in Day.js when day is added)
var postNewDay = function(cb){
	$.post('/days', function(data){
		cb(data);
		console.log('POST response data', data);
	})
}

// takes previousDay to get id (called in Day.js)
var deleteDayById = function(previousDay){
	$.ajax({
		url: '/days/'+previousDay._id,
		type: 'DELETE',
		success: function(data){
			console.log('DELETE reponse data', data);
		}
	})
}

var addAttraction = function(currentDay, attractionType, attraction){
	$.post('/days/'+currentDay._id+'/'+attractionType, {_id: attraction._id}, function(data){
		//cb(data);
		console.log('POST from attraction', data);
	})
}

var deleteHotelRef = function(currentDay){

	$.ajax({
		url: '/days/'+currentDay._id+'/hotel',
		type: 'DELETE',
		success: function(data){
			console.log('DELETE hotel reponse data', data);
		}
	})
}

var days, currentDay;

$(document).ready(function () {
	getAllDays();
	days = []; //array holding all day objects, object data are added in Day.js
	currentDay = new Day(); // creates new day object 
	currentDay.$button.addClass('current-day');


});