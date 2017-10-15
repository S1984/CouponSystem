var module = angular.module("facade");

module.controller("AdminCreateCustomer", AdminCreateCustomerCtrlCtor)

function AdminCreateCustomerCtrlCtor(CreateCustomerSrvc) {
    
    this.newCustomer = CreateCustomerSrvc.newCustomer;
    this.messageFromNewCustomer = CreateCustomerSrvc.messageFromNewCustomer;
    this.createCustomerSucceed = CreateCustomerSrvc.createCustomerSucceed;
    this.createCustomer = function () {
        CreateCustomerSrvc.createCustomer(this.newCustomer);

    }
}