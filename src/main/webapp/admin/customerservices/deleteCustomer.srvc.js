(function () {

    var module = angular.module("facade")
    module.service("DeleteCustomerSrvc", ServiceCtor)

    function ServiceCtor($http, GetAllCustomersSrvc) {

    	var self = this;
    	this.messageFromDeleteCustomer = {};
        this.deleteCustomerSucceed = {};
        this.deleteCustomerFailed = {};
        
        this.deleteCustomer = function (custId) {
            var promise = $http.delete('http://localhost:8080/CouponSystemPart2B/webapi/admin/removecustomer/' + custId)
            promise.then(function (resp) {
            	self.deleteCustomerSucceed.flag = true;
            	self.messageFromDeleteCustomer.text = resp.data;
            	GetAllCustomersSrvc.getAllCustomers();
                
            }, function (err) {
            	self.deleteCustomerFailed.flag = true;
            	self.messageFromDeleteCustomer.text = err.data;
            	
            })
        }
    }
})();