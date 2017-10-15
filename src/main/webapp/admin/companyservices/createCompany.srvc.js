(function () {

    var module = angular.module("facade")
    module.service("CreateCompanySrvc", ServiceCtor)

    function ServiceCtor($http,GetAllCompaniesSrvc) {
        var self = this;
        this.messageFromNewCompany = {};
        this.createCompanySucceed = {};
        this.newCompany = {};

        this.createCompany = function () {
            var promise = $http.post('http://localhost:8080/CouponSystemPart2B/webapi/admin/createcompany', this.newCompany.comp)
            promise.then(function (resp) {
                self.messageFromNewCompany.text = resp.data;
                self.createCompanySucceed.flag = true;
                delete self.newCompany.comp;
                GetAllCompaniesSrvc.getAllCompanies();
            }, function (err) {
                self.createCompanySucceed.flag = false;
                self.messageFromNewCompany.text = err.data;
            })
        }
    }
})();