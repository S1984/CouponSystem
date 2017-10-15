(function () {

    var module = angular.module("facade")
    module.service("updateCouponSrvc", ServiceCtor)

    function ServiceCtor($http, GetAllCouponsSrvc) {


        var self = this;
        this.messageFromUpdateCoupon = {};
        this.updateCouponSucceed = {};
        this.updateCouponFailed = {};

        this.updateCoupon = function (updatedCoup) {
            var promise = $http.put('http://localhost:8080/CouponSystemPart2B/webapi/company/updatecoupon', updatedCoup)
            promise.then(function (resp) {
                self.messageFromUpdateCoupon.text = resp.data;
                self.updateCouponSucceed.flag = true;
                self.updateCouponFailed.flag = false;
            }, function (err) {
                self.messageFromUpdateCoupon.text = err.data;
                self.updateCouponSucceed.flag = false;
                self.updateCouponFailed.flag = true;
            })
        }
    }
})();