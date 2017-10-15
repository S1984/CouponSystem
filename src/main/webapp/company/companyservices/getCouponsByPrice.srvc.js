(function() {

	var module = angular.module("facade")
	module.service("GetCouponByPriceSrvc", ServiceCtor)

	function ServiceCtor($http) {
		var self = this;
		this.coupons = [];
        this.edits = [];

		this.messageGetByPrice = {};
		this.getByPriceSucceed = {};

		
		
		this.getCoupons = function(plimit) {
			var promise = $http
					.get('http://localhost:8080/CouponSystemPart2B/webapi/company/getcouponbypricelimit/' + plimit)
			promise.then(function(resp) {
			    self.coupons.length = 0;
                for (var i = 0; i < resp.data.length; i++) {
                    self.coupons.push (new Coupon(resp.data[i]));
                }
                self.createArry(self.coupons.length);
                self.getByPriceSucceed.flag = true;
            }, function (err) {
                self.getByPriceSucceed.flag = false;
                self.messageGetByPrice.text = err.data;
            })
        }
		
		this.createArry = function (size) {
            this.edits.length = 0;
            for (var i = 0; i < size; ++i) {
                this.edits.push(false);
            }
        }
	}
})();