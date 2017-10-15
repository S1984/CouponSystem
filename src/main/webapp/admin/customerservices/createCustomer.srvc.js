(function () {

    var module = angular.module("facade")
    module.service("CreateCustomerSrvc", ServiceCtor)
    function ServiceCtor($http,GetAllCustomersSrvc) {
        var self = this;
        this.messageFromNewCustomer = {};
        this.createCustomerSucceed = {};
        this.newCustomer = {};
        
        this.createCustomer = function (newCustomer) {
            var promise = $http.post('http://localhost:8080/CouponSystemPart2B/webapi/admin/createcustomer', this.newCustomer.cust)
            promise.then(function (resp) {
                self.messageFromNewCustomer.text = resp.data;
                self.createCustomerSucceed.flag = true;
                delete self.newCustomer.cust;

                GetAllCustomersSrvc.getAllCustomers();
            }, function (err) {
                self.createCustomerSucceed.flag = false;
                self.messageFromNewCustomer.text = err.data;
            })
        }
    }
})();