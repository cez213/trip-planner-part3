// applies a function to each value in the object
function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	days = []; //array holding all day objects, object data are added in Day.js
	currentDay = new Day(); // creates new day object 
	currentDay.$button.addClass('current-day');
});