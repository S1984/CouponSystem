(function () {

    var module = angular.module("facade")
    module.service("GetAllPurchasedCouponsByTypeSrvc", ServiceCtor)

    function ServiceCtor($http) {
        var self = this;
        this.coupons = [];
        this.messageGetAllCoupons = {};
        this.getAllCouponsFailed = {};

        this.getallpurchasedcouponsbytype = function (pcoupontype) {
            var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/customer/getallpurchasedcouponsbytype/' + pcoupontype)
            promise.then(function (resp) {
 
            	self.coupons.length = 0;
                for (var i = 0; i < resp.data.length; i++) {
                    self.coupons.push(resp.data[i]);
                }
                self.getAllCouponsFailed.flag = false;
            }, function (err) {
                self.getAllCouponsFailed.flag = true;
                self.messageGetAllCoupons.text = err.data;
            })
        }
     
    }
})();
