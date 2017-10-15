var module = angular.module("facade");

module.controller("AdminGetAllCompanies", AdminGetAllCompaniesCtrlCtor)

function AdminGetAllCompaniesCtrlCtor(GetAllCompaniesSrvc, UpdateCompanySrvc, DeleteCompanySrvc) {
   
    //getall
	this.companies = GetAllCompaniesSrvc.companies;
    this.edits = GetAllCompaniesSrvc.edits;
    this.messageGetAllCompanies = GetAllCompaniesSrvc.messageGetAllCompanies;
    this.getAllCompaniesFailed = GetAllCompaniesSrvc.getAllCompaniesFailed;
    //delete
    this.messageFromDeleteComapny = DeleteCompanySrvc.messageFromDeleteComapny;
    this.deleteComapnySucceed = DeleteCompanySrvc.deleteComapnySucceed;
    this.deleteComapnyFailed = DeleteCompanySrvc.deleteComapnyFailed;
    //update
	this.messageFromUpdateComapny = UpdateCompanySrvc.messageFromUpdateComapny;
    this.updateComapnySucceed = UpdateCompanySrvc.updateComapnySucceed;
    this.updateComapnyFailed = UpdateCompanySrvc.updateComapnyFailed;
    
    this.getAllCompanies = function () {
        GetAllCompaniesSrvc.getAllCompanies();
    }
    /**********update*************** */
    //this function manages show/edit at the html page by index 
    //and calls the update service   
    this.editFunc = function (comp, index) {
    	this.resetFlag();
        if (this.edits[index]) {
            UpdateCompanySrvc.updateCompany(comp);
        }
        this.edits[index] = !this.edits[index];
    }
    /************delete********** */

    this.deleteCompany = function (compId) {
    	this.resetFlag();

        DeleteCompanySrvc.deleteCompany(compId);
    }
    this.getAllCompanies();
    
    //we call this function in order to show the relative error or success 
    
    this.resetFlag = function() {
    this.deleteComapnySucceed.flag = false;
    this.deleteComapnyFailed.flag = false;
    this.updateComapnySucceed.flag = false;
    this.updateComapnyFailed.flag = false;
    }
}