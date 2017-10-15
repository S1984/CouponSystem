var app = angular.module("facade");
app.directive("ngWelcome", function() {

	var self = this;
	this.adjustingMessage = function() {

		curHr = (new Date()).getHours();

		if (curHr <= 4) {
			return "Good Night";
		} else if (curHr <= 11) {
			return "Good Morning";
		} else if (curHr <= 17) {
			return "Good Afternoon";
		} else if (curHr <= 20) {
			return "Good Evening";
		} else {
			return "Good Night";
		}

	}
	return {
		template : function(elem, attr) {
			return self.adjustingMessage() + " " + attr.name + "!"
		}
	};
});
