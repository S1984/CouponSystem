(function () {
    
        var module = angular.module("facade")
        module.service("GetCustomerNameSrvc", ServiceCtor)
    
        function ServiceCtor($http) {
        	var self = this;
            this.customerName = {};
    
            this.getCustomerName = function () {
                var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/customer/getcustomername')
                promise.then(function (resp) {
                    self.customerName.name = resp.data;
                                        
                }, function (err) {
                	self.customerName.name = "Customer";
                })
            }
        }
    })();