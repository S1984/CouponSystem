(function () {

    var module = angular.module("facade")
    module.service("GetAllCustomersSrvc", ServiceCtor)

    function ServiceCtor($http) {
        var self = this;
        this.customers = [];
        this.edits = [];
        this.messageGetAllCustomers = {};
        this.getAllCustomersFailed = {};

        this.getAllCustomers = function () {
            var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/admin/getallcustomers')
            promise.then(function (resp) {
                self.customers.length = 0;
                for (var i = 0; i < resp.data.length; i++) {
                    self.customers.push(resp.data[i]);
                }
                self.createArry(self.customers.length);
                self.getAllCustomersFailed.flag = false;
            }, function (err) {
                self.getAllCustomersFailed.flag = true;
                self.messageGetAllCustomers.text = err.data;
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
