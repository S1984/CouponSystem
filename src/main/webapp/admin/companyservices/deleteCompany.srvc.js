(function () {

    var module = angular.module("facade")
    module.service("DeleteCompanySrvc", ServiceCtor)

    function ServiceCtor($http, GetAllCompaniesSrvc) {

    	var self = this;
    	this.messageFromDeleteComapny = {};
        this.deleteComapnySucceed = {};
        this.deleteComapnyFailed = {};
        
        this.deleteCompany = function (compId) {
            var promise = $http.delete('http://localhost:8080/CouponSystemPart2B/webapi/admin/removecompany/' + compId)
            promise.then(function (resp) {
                self.deleteComapnySucceed.flag = true;
                self.messageFromDeleteComapny.text = resp.data;
                GetAllCompaniesSrvc.getAllCompanies();
            }, function (err) {
            	self.deleteComapnyFailed.flag = true;
            	self.messageFromDeleteComapny.text = err.data;

            })
        }
    }
})();