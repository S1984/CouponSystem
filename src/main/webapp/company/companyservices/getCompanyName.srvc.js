(function () {
    
        var module = angular.module("facade")
        module.service("GetCompanyNameSrvc", ServiceCtor)
    
        function ServiceCtor($http) {
        	var self = this;
            this.companyName = {};
    
            this.getCompanyName = function () {
                var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/company/getcompanyname')
                promise.then(function (resp) {
                    self.companyName.name = resp.data;
                                        
                }, function (err) {
                	self.companyName.name = "Company";
                })
            }
        }
    })();