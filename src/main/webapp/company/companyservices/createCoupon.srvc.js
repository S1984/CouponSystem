(function () {
    
        var module = angular.module("facade")
        module.service("CreateCouponSrvc", ServiceCtor)
    
        function ServiceCtor($http) {
            var self = this;
            this.messageFromNewCoupon = {};
            this.createCouponSucceed = {};
            this.newCoupon = {};
    
            this.createCoupon = function () {
                var promise = $http.post('http://localhost:8080/CouponSystemPart2B/webapi/company/createcoupon', this.newCoupon.coup)
                promise.then(function (resp) {
                    self.messageFromNewCoupon.text = resp.data;
                    self.createCouponSucceed.flag = true;
                   delete self.newCoupon.coup;
                    
                }, function (err) {
                    self.createCouponSucceed.flag = false;
                    self.messageFromNewCoupon.text = err.data;
                })
            }
        }
    })();