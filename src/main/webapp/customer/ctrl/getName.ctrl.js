var module = angular.module("facade");

module.controller("GetName", CustomerGetNameCtrlCtor)

function CustomerGetNameCtrlCtor(GetCustomerNameSrvc) {
	
	
	this.customerName = GetCustomerNameSrvc.customerName;
	
	this.getCustomerName = function() {
		GetCustomerNameSrvc.getCustomerName();
	}
	
	this.getCustomerName();
	
}