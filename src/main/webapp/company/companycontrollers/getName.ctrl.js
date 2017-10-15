var module = angular.module("facade");

module.controller("GetName", CompanyGetNameCtrlCtor)

function CompanyGetNameCtrlCtor(GetCompanyNameSrvc) {
	
	
	this.companyName = GetCompanyNameSrvc.companyName;
	
	this.getCompanyName = function() {
		GetCompanyNameSrvc.getCompanyName();
	}
	
	this.getCompanyName();
	
}