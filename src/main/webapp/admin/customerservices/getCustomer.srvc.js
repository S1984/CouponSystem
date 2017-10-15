(function () {

    var module = angular.module("facade")
    module.service("GetCustomerSrvc", ServiceCtor)

    function ServiceCtor($http) {
        var self = this;
        this.getedCustomer = {};
        this.getCustomerSucceed = {};
        this.failedToGetCustomer = {};

        this.getCustomer = function (idToGet) {
            var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/admin/getcustomer/' + idToGet)
            promise.then(function (resp) {
                self.getedCustomer.cust = resp.data;
                self.getCustomerSucceed.flag = true;
                self.failedToGetCustomer.flag = false;
            }, function (err) {
                self.failedToGetCustomer.flag = true;
                self.getCustomerSucceed.flag = false;
                self.getedCustomer.text = err.data;
            })
        }
    }
})();