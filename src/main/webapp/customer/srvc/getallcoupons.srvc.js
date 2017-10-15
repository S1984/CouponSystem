(function () {

    var module = angular.module("facade")
    module.service("GetAllCouponsSrvc", ServiceCtor)

    function ServiceCtor($http) {
        var self = this;
        this.coupons = [];
        this.edits = [];
        this.messageGetAllCoupons = {};
        this.getAllCouponsFailed = {};

        this.getallcoupons = function () {
            var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/customer/getAvailableCouponToPurchase')
            promise.then(function (resp) {
                self.coupons.length = 0;
                for (var i = 0; i < resp.data.length; i++) {
                    self.coupons.push(resp.data[i]);
                }
                self.createArry(self.coupons.length);
                self.getAllCouponsFailed.flag = false;
            }, function (err) {
                self.getAllCouponsFailed.flag = true;
                self.messageGetAllCoupons.text = err.data;

            })
        }
        this.createArry = function (size) {
            this.edits.length = 0;
            for (var i = 0; i < this.edits.length; ++i) {
                this.edits.push(false);
            }
        }
    }
})();
