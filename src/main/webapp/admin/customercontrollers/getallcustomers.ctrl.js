var module = angular.module("facade");

module.controller("AdminGetAllCustomers", AdminGetAllCustomersCtrlCtor)

function AdminGetAllCustomersCtrlCtor(GetAllCustomersSrvc, UpdateCustomerSrvc,
		DeleteCustomerSrvc) {
	// getall
	this.customers = GetAllCustomersSrvc.customers;
	this.edits = GetAllCustomersSrvc.edits;
	this.messageGetAllCustomers = GetAllCustomersSrvc.messageGetAllCustomers;
	this.getAllCustomersFailed = GetAllCustomersSrvc.getAllCustomersFailed;
	// delete
	this.messageFromDeleteCustomer = DeleteCustomerSrvc.messageFromDeleteCustomer;
	this.deleteCustomerSucceed = DeleteCustomerSrvc.deleteCustomerSucceed;
	this.deleteCustomerFailed = DeleteCustomerSrvc.deleteCustomerFailed;

	// update
	this.messageFromUpdateCustomer = UpdateCustomerSrvc.messageFromUpdateCustomer;
	this.updateCustomerSucceed = UpdateCustomerSrvc.updateCustomerSucceed;
	this.updateCustomerFailed = UpdateCustomerSrvc.updateCustomerFailed;
	this.getAllCustomers = function() {
		GetAllCustomersSrvc.getAllCustomers();
	}
	/** ********update*************** */
    //this function manages show/edit at the html page by index 
    //and calls the update service
	this.editFunc = function(cust, index) {
		this.resetFlag();
		if (this.edits[index]) {
			UpdateCustomerSrvc.updateCustomer(cust);
		}
		this.edits[index] = !this.edits[index];
	}
	/** **********delete********** */

	this.deleteCustomer = function(custId) {
		this.resetFlag();
		DeleteCustomerSrvc.deleteCustomer(custId);
	}
	this.getAllCustomers();

    //we call this function in order to show the relative error or success 
	this.resetFlag = function() {
		this.deleteCustomerSucceed.flag = false;
		this.deleteCustomerFailed.flag = false;
		this.updateCustomerSucceed.flag = false;
		this.updateCustomerFailed.flag = false;
	}
}