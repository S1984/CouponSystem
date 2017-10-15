(function () {

    var module = angular.module("facade")
    module.service("GetAllCompaniesSrvc", ServiceCtor)

    function ServiceCtor($http) {
        var self = this;
        this.companies = [];
        this.edits = [];
        this.messageGetAllCompanies = {};
        this.getAllCompaniesFailed = {};

        this.getAllCompanies = function () {
            var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/admin/getallcompanies')
            promise.then(function (resp) {
            	
                self.companies.length = 0;
                for (var i = 0; i < resp.data.length; i++) {
                    self.companies.push(resp.data[i]);
                }
                self.createArry(self.companies.length);
                self.getAllCompaniesFailed.flag = false;
            }, function (err) {
                self.getAllCompaniesFailed.flag = true;
                self.messageGetAllCompanies.text = err.data;
                
            })
        }
        this.createArry = function (size) {
            this.edits.length = 0;
            for (var i = 0; i < size; ++i) {
                this.edits.push(false);
            }
        }
    }
})();
