var Day; //makes Day is a global variable

$(document).ready(function () {
	Day = function () {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		this.number = days.push(this);

		this.buildButton() //build a DOM element, but does not put it anywhere
			.drawButton(); //draw puts it on the page
	}

	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		this.$button.on('click', function () {
			self.switchTo();
		});
		return this;
	};

	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};

	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		// erase old day
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		currentDay.restaurants.forEach(eraseOne);
		currentDay.thingsToDo.forEach(eraseOne);

		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		// draw new day
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);

		// remove class from currentDay and adds class to new currentDay
		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		
		// updates the day number
		$('#day-title > span').text('Day ' + this.number);
		
		// update currentDay, so that is it up to date for other functions
		currentDay = this;
		getDayById(currentDay);
	};

	function deleteCurrentDay () {
		if (days.length > 1) {
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				newCurrent = days[index] || days[index - 1];
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			newCurrent.switchTo();
			previousDay.eraseButton();
			deleteDayById(previousDay);
		}
	};

	$('#add-day').on('click', function () {
		var day = new Day();
		postNewDay(function(data){
			day._id = data._id;
		});
	});

	$('#day-title > .remove').on('click', deleteCurrentDay);
});