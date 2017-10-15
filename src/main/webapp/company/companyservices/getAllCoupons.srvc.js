(function () {
    
        var module = angular.module("facade")
        module.service("GetAllCouponsSrvc", ServiceCtor)
    
        function ServiceCtor($http) {
            var self = this;
            //this.path;
            this.coupons = [];
            this.edits = [];
            this.messageGetAllCoupons = {};
            this.getAllCouponsFailed = {};
    
            this.getAllCoupons = function (path) {
                var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/company/'+ path)
                promise.then(function (resp) {
                    self.coupons.length = 0;
                    for (var i = 0; i < resp.data.length; i++) {
                        self.coupons.push (new Coupon(resp.data[i]));
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
                for (var i = 0; i < size; ++i) {
                    this.edits.push(false);
                }
            }

        }
    })();