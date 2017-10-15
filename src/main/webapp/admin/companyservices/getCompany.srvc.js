(function () {

    var module = angular.module("facade")
    module.service("GetCompanySrvc", ServiceCtor)

    function ServiceCtor($http) {
        var self = this;
        this.getedCompany = {};
        this.getCompanySucceed = {};
        this.failedToGetCompany = {};

        this.getCompany = function (idToGet) {
            var promise = $http.get('http://localhost:8080/CouponSystemPart2B/webapi/admin/getcompany/' + idToGet)
            promise.then(function (resp) {
                self.getedCompany.comp = resp.data;
                self.getCompanySucceed.flag = true;
                self.failedToGetCompany.flag = false;
            }, function (err) {
                self.failedToGetCompany.flag = true;
                self.getCompanySucceed.flag = false;
                self.getedCompany.text = err.data;
            })
        }
    }
})();