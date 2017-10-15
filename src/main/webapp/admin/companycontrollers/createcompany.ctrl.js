var module = angular.module("facade");

module.controller("AdminCreateCompany", AdminCreateCompanyCtrlCtor)

function AdminCreateCompanyCtrlCtor(CreateCompanySrvc) {
    
    //createCompany scope;
    this.newCompany = CreateCompanySrvc.newCompany;
    this.messageFromNewCompany = CreateCompanySrvc.messageFromNewCompany;
    this.createCompanySucceed = CreateCompanySrvc.createCompanySucceed;
    this.createCompany = function () {
        CreateCompanySrvc.createCompany(this.newCompany);

    }
}