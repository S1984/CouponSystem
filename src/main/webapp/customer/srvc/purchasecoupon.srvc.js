(function () {

    var module = angular.module("facade")
    module.service("PurchaseCouponSrvc", ServiceCtor)

    function ServiceCtor($http,GetAllCouponsSrvc) {
    	var self = this;
        this.messagePurchaseCoupon = {};
        this.purchaseCouponFailed = {};
        this.purchaseCouponSucceed = {};

        this.purchasecoupon = function (coupon) {
            var promise = $http.post('http://localhost:8080/CouponSystemPart2B/webapi/customer/purchasecoupon', coupon)
            promise.then(function (resp) {
            	GetAllCouponsSrvc.getallcoupons();
            	 self.messagePurchaseCoupon.text = resp.data;
            	 self.purchaseCouponSucceed.flag = true;


            }, function (err) {
            	self.purchaseCouponFailed.flag = true;
                self.messagePurchaseCoupon.text = err.data;
            	GetAllCouponsSrvc.getallcoupons();
            	location.reload(true);
            })
        }
    }


})();