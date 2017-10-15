var module = angular.module("facade");

module.controller("AdminGetCompany", AdminGetCompanyCtrlCtor)

function AdminGetCompanyCtrlCtor(GetCompanySrvc,GetAllCompaniesSrvc) {
	

	this.companies = GetAllCompaniesSrvc.companies;
	this.messageGetAllCompanies = GetAllCompaniesSrvc.messageGetAllCompanies;
    this.getAllCompaniesFailed = GetAllCompaniesSrvc.getAllCompaniesFailed;
    
    
    this.idToGet = undefined;
    this.getedCompany = GetCompanySrvc.getedCompany;
    this.getCompanySucceed = GetCompanySrvc.getCompanySucceed;
    this.failedToGetCompany = GetCompanySrvc.failedToGetCompany;
    this.getCompany = function () {
        GetCompanySrvc.getCompany(this.idToGet);
        this.idToGet = undefined;
    }
    this.loadAllCompanys = function() {
    	GetAllCompaniesSrvc.getAllCompanies();
		
	}
}