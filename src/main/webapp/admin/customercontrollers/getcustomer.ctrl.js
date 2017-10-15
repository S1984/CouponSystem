var module = angular.module("facade");

module.controller("AdminGetCustomer", AdminGetCustomerCtrlCtor)

function AdminGetCustomerCtrlCtor(GetCustomerSrvc,GetAllCustomersSrvc) {
   

    this.customers = GetAllCustomersSrvc.customers;
    this.messageGetAllCustomers = GetAllCustomersSrvc.messageGetAllCustomers;
    this.getAllCustomersFailed = GetAllCustomersSrvc.getAllCustomersFailed;

	
	this.idToGet = undefined;
    this.getedCustomer = GetCustomerSrvc.getedCustomer;
    this.getCustomerSucceed = GetCustomerSrvc.getCustomerSucceed;
    this.failedToGetCustomer = GetCustomerSrvc.failedToGetCustomer;
    this.getCustomer = function () {
        GetCustomerSrvc.getCustomer(this.idToGet);
    }    
        this.loadAllCustomers = function() {
        	
        	GetAllCustomersSrvc.getAllCustomers();

    }
}
    