var Hotel;

$(document).ready(function () {
	// data is the full object containing the hotel data
	// data contains all of the seed information for that object
	Hotel = function (data) {
		var self = this;
		// puts the values directly on the object
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}
		
		// $.post('/days/'+currentDay._id+'/hotel', {_id: this._id}, function(data){
		// 	data.buildMarker()
		// 		.drawMarker()
		// 		.buildItineraryItem()
		// 		.drawItineraryItem();
		// 	currentDay.hotel = data; 
		// console.log('POST from attraction', data);
		// })

		// })
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this; // stores currentDay hotel
		// when generateAttraction is called, it calls all these methods
	}
	//draw map markers
	Hotel.prototype = generateAttraction({
		icon: '/images/lodging_0star.png',
		$listGroup: $('#my-hotel .list-group'),
		$all: $('#all-hotels'),
		all: all_hotels,
		constructor: Hotel
	});
	//remove markers and itinerary item
	Hotel.prototype.delete = function () {
		currentDay.hotel
			.eraseMarker()
			.eraseItineraryItem();
		currentDay.hotel = null;
		deleteHotelRef(currentDay);
	};
});