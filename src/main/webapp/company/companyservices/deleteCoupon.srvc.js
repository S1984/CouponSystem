(function () {

    var module = angular.module("facade")
    module.service("deleteCouponSrvc", ServiceCtor)

    function ServiceCtor($http, GetAllCouponsSrvc) {

        var self = this;
        this.messageFromDeleteCoupon = {};
        this.deleteCouponSucceed = {};
        this.deleteCouponFailed = {};

        this.deleteCoupon = function (coupId) {
            var promise = $http.delete('http://localhost:8080/CouponSystemPart2B/webapi/company/removecoupon/' + coupId)
            promise.then(function (resp) {
                GetAllCouponsSrvc.getAllCoupons('getallcoupons');
                self.messageFromDeleteCoupon.text = resp.data;
                self.deleteCouponSucceed.flag = true;
                self.deleteCouponFailed.flag = false;
            }, function (err) {
            	self.messageFromDeleteCoupon.text = err.data;
            	self.deleteCouponSucceed.flag = false;
            	self.deleteCouponFailed.flag = true;
            })
        }
    }
})();