(function() {

	var module = angular.module("facade")
	module.service("GetCouponSrvc", ServiceCtor)

	function ServiceCtor($http) {
		var self = this;
		this.coupon = {};
		this.messageGetCoupon = {};
		this.getCouponSucceed = {};

		
		
		this.getCoupon = function(id) {
			var promise = $http
					.get('http://localhost:8080/CouponSystemPart2B/webapi/company/getcoupon/' + id)
			promise.then(function(resp) {
				self.coupon.coup = new Coupon(resp.data);
				self.getCouponSucceed.flag = true;
			}, function(err) {
				self.getCouponSucceed.flag = false;
				self.messageGetCoupon.text = err.data;
			})
		}
	}
})();