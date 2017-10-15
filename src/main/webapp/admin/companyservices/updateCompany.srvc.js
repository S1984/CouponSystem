(function() {

	var module = angular.module("facade")
	module.service("UpdateCompanySrvc", ServiceCtor)

	function ServiceCtor($http, GetAllCompaniesSrvc) {

		var self = this;
		this.messageFromUpdateComapny = {};
		this.updateComapnySucceed = {};
		this.updateComapnyFailed = {};

		this.updateCompany = function(updatedComp) {
			var promise = $http
					.put(
							'http://localhost:8080/CouponSystemPart2B/webapi/admin/updatecompany',
							updatedComp)
			promise
					.then(
							function(resp) {
								self.messageFromUpdateComapny.text = "";
								GetAllCompaniesSrvc.getAllCompanies();
								self.updateComapnySucceed.flag = true;
								self.messageFromUpdateComapny.text = resp.data;
							},
							function(err) {
								GetAllCompaniesSrvc.getAllCompanies();
								self.updateComapnyFailed.flag = true;
								self.messageFromUpdateComapny.text = err.data;
							})
		}
	}

})();