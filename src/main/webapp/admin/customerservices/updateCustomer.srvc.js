(function () {

    var module = angular.module("facade")
    module.service("UpdateCustomerSrvc", ServiceCtor)

    function ServiceCtor($http,GetAllCustomersSrvc) {

    	
    	var self = this;
    	this.messageFromUpdateCustomer = {};
        this.updateCustomerSucceed = {};
        this.updateCustomerFailed = {};
        
        this.updateCustomer = function (updatedCust) {
            var promise = $http.put('http://localhost:8080/CouponSystemPart2B/webapi/admin/updatecustomer', updatedCust)
            promise.then(function (resp) {
            	self.updateCustomerSucceed.flag = true;
            	self.messageFromUpdateCustomer.text = resp.data;
            }, function (err) {
            	GetAllCustomersSrvc.getAllCustomers();
                self.updateCustomerFailed.flag = true;
                self.messageFromUpdateCustomer.text = err.data;
            })
        }
    }


})();